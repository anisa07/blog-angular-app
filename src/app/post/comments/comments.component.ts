import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from '../../models/CommentModel';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {finalize, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {STATE, User, USER_TYPE} from '../../models/User';

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

  constructor(private userService: UserService, private postService: PostService , private storeService: StoreService) {
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

  deleteComment(comment: CommentModel) {
    const deleteObservable$ = this.postService.deleteComment(comment.id).pipe(
      switchMap(() => this.postService.readAllComments({postId: comment.postId, updatedAt: this.comments[0].updatedAt, size: this.size, page: this.page})),
      finalize(() => {
        this.closeCommentForm();
      })
    );
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
