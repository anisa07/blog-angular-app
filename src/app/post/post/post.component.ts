import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, switchMap, take} from 'rxjs/operators';
import {Like} from '../../models/Like';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {Observable, of} from 'rxjs';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
  currentUserId: string = '';

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private postService: PostService,
              private _snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog) {
    this.currentUserId = userService.getUserId();
  }

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

  isPostAuthor() {
    return this.post.authorId === this.currentUserId;
  }

  likePost(l: number) {
    this.isLoading = true;
    const like: Like = {
      value: l,
      userId: '',
      postId: this.post.id
    };
    let observable$;
    if (!this.currentUserLike) {
      observable$ = this.postService.setLike(like);
    } else {
      observable$ = this.postService.updateLike(like);
    }

    observable$
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

  isDisabled() {
    return this.loginRequired || this.isLoading;
  }

  editPost() {
    this.router.navigate(['post', 'update', this.post.id]);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: 'Are you sure you want to delete this post completely?',
      }
    });

    return dialogRef.afterClosed();
  }

  deletePost() {
    this.confirmDelete().pipe(
      take(1),
      switchMap((val) => {
        if(val) {
          return this.postService.deletePost(this.post.id)
        } else {
          return of(false)
        }
      })
    ).subscribe((response) => {
        if (response === null) {
          this.router.navigate(['post']);
        }
      })
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
    );
    this.getComments(createCommentObservable$);
  }

  showMoreComments({
                     observable$,
                     addComments
                   }: { observable$: Observable<any>, addComments?: boolean }) {
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
