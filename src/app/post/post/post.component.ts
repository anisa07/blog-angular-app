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
import {STATE, User, USER_TYPE} from '../../models/User';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post = null;
  authorData: User;
  authorPhoto: string;
  currentUserLike: number;
  loginRequired: boolean;
  postData = [];
  image: string = '';
  isLoading: boolean = false;
  showCommentForm: boolean = false;
  currentUserId: string = '';
  currentUser: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private storeService: StoreService,
              private postService: PostService,
              private _snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUserId = this.userService.getUserId();
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

    this.userService.getUserInfo(this.post.authorId).subscribe(response => {
      this.authorData = response;
      if (this.authorData.filename) {
        this.authorPhoto = this.userService.getUserPhoto(this.authorData.filename);
      }
    });

    this.storeService.currentUser$.subscribe(response => {
      this.currentUser = response;
    })
  }

  isPostAuthor() {
    return this.post.authorId === this.currentUserId || (this.currentUser?.type === USER_TYPE.SUPER && this.currentUser?.state === STATE.ACTIVE);
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
        return  val ? this.postService.deletePost(this.post.id) : of(false)
      })
    ).subscribe((response) => {
        if (response === null) {
          this.router.navigate(['post']);
        }
      })
  }

  showComment() {
    this.showCommentForm = !this.showCommentForm;
  }

  submitComment(e) {
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
