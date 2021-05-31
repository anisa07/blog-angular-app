import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from '../../models/CommentModel';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {finalize, switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {STATE, User, USER_TYPE} from '../../models/User';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input()
  comments: CommentModel[] = [];
  @Input()
  moreButton: boolean = false;
  @Output()
  loadComments = new EventEmitter<{ observable$: Observable<any>, addComments?: boolean }>();
  // show more comments
  currentUserId = undefined;
  selectedComment: CommentModel = undefined;
  isAuth = undefined;
  size: number = 10;
  page: number = 1;
  currentUser: User;

  constructor(private userService: UserService, private postService: PostService , private storeService: StoreService, public dialog: MatDialog) {
  }

  isCommentAuthor(authorId: string) {
    return authorId === this.currentUserId || (this.currentUser?.state === STATE.ACTIVE && this.currentUser?.type === USER_TYPE.SUPER);
  }

  ngOnInit(): void {
    this.currentUserId = this.userService.getUserId();
    this.userService.isAuth().subscribe((response) => this.isAuth = response);
    this.storeService.currentUser$.subscribe(response => {
      this.currentUser = response;
    })
  }

  showEditFormForComment(comment: CommentModel) {
    this.selectedComment = comment;
  }

  closeCommentForm() {
    this.selectedComment = undefined;
  }

  showMoreComments() {
    const lastComment = this.comments[this.comments.length - 1];
    this.page +=1;
    const showMore$ = this.postService.readAllComments({
      postId: lastComment.postId, updatedAt: lastComment.updatedAt, size: this.size, page: this.page,
    });
    this.loadComments.emit({observable$: showMore$, addComments: true});
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: 'Are you sure you want to delete this comment?',
      }
    });

    return dialogRef.afterClosed();
  }

  deleteComment(comment: CommentModel) {
    const deleteObservable$ = this.confirmDelete().pipe(
      take(1),
      switchMap((val) => {
        return  val ? this.postService.deleteComment(comment.id) : of(false)
      }),
      switchMap((val) =>
        val ? this.postService.readAllComments(
          {
            postId: comment.postId,
            updatedAt: this.comments[0].updatedAt,
            size: this.size,
            page: this.page
          }
        ) : of(false)
      ),
      finalize(() => {
        this.closeCommentForm();
      })
    )
    this.loadComments.emit({observable$: deleteObservable$});
  }

  submitComment(v: { [key: string]: string; }) {
    const editObservable$ = this.postService.editComment({
      userId: this.currentUserId,
      postId: this.selectedComment.postId,
      text: v.comment,
      id: this.selectedComment.id
    }).pipe(
      switchMap(() => this.postService.readAllComments({
        postId: this.selectedComment.postId,
        updatedAt: this.selectedComment.updatedAt,
        size: this.size,
        page: this.page
      })), finalize(() => {
        this.closeCommentForm();
      })
    );
    this.loadComments.emit({observable$: editObservable$});
  }
}
