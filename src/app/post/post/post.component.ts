import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {finalize, switchMap} from 'rxjs/operators';
import {Like} from '../../models/Like';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {Observable} from 'rxjs';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post = null;
  currentUserLike: number;
  loginRequired: boolean;
  postData = [];
  image: string = '';
  isLoading: boolean = false;
  showCommentForm: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private postService: PostService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.postData = this.route.snapshot.data['postData'];
    if (!(this.postData[0] instanceof HttpErrorResponse)) {
      this.post = this.postData[0];
      if (this.post.filename) {
        this.image = this.postService.getImage(this.post.filename);
      }
    }
    if (!(this.postData[1] instanceof HttpErrorResponse)) {
      this.currentUserLike = this.postData[1].value;
    } else {
      this.loginRequired = true;
    }
  }

  likePost(l: number) {
    this.isLoading = true;
    const like: Like = {
      value: l,
      userId: '',
      postId: this.post.id
    };
    let observable;
    if (!this.currentUserLike) {
      observable = this.postService.setLike(like);
    } else {
      observable = this.postService.updateLike(like);
    }

    observable
      .pipe(
        switchMap(() => this.postService.readLikesForPost(this.post.id)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.post = {...this.post, likesValue: response.value};
        this.currentUserLike = l;
      }, () => {
        this.currentUserLike = undefined;
      });
  }

  likeIsDisabled(v: number) {
    return this.loginRequired || this.currentUserLike === v || this.isLoading;
  }

  commentIsDisabled() {
    return this.loginRequired || this.isLoading;
  }

  showComment() {
    this.showCommentForm = true;
  }

  submitComment(e) {
    this.errorMessage = undefined;
    this.isLoading = true;
    const createCommentObservable$ = this.postService.createComment({
      text: e.comment,
      userId: '',
      postId: this.post.id
    }).pipe(
      switchMap(() => this.postService.readAllComments({postId: this.post.id})),
      finalize(() => {
        this.isLoading = false;
      })
    )
    this.getComments(createCommentObservable$);
  }

  showMoreComments({
                     observable$,
                     addComments
  }: {observable$: Observable<any>, addComments?: boolean}) {
    this.getComments(observable$, addComments);
  }

  getComments(observable$: Observable<any>, addComments?: boolean) {
    this.errorMessage = undefined;
    observable$.subscribe((response) => {
      this.showCommentForm = false;
      this.post.comments = addComments ? [...this.post.comments, ...response.comments] : response.comments;
      this.post.showMoreComments = response.showMoreComments;
    }, (error: Error) => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: error.message, type: 'ERROR'
        }
      });
    });
  }
}
