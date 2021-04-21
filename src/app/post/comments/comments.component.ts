import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from '../../models/CommentModel';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {catchError, finalize, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input()
  comments: CommentModel[] = [];
  @Input()
  moreButton: boolean =  false;
  @Output()
  loadComments = new EventEmitter<{observable$: Observable<any>, addComments?: boolean}>();
  // show more comments
  currentUserId = undefined;
  selectedComment: CommentModel = undefined;
  isAuth = undefined;
  size: number = 10;

  constructor(private userService: UserService, private postService: PostService) {
    this.currentUserId = userService.getUserId();
  }

  isCommentAuthor(authorId: string) {
    return authorId === this.currentUserId;
  }

  ngOnInit(): void {
    this.userService.isAuth().subscribe((response) => this.isAuth = response)
  }

  showEditFormForComment(comment: CommentModel) {
    this.selectedComment = comment;
  }

  closeCommentForm() {
    this.selectedComment = undefined;
  }

  showMoreComments() {
    const lastComment = this.comments[this.comments.length - 1];
    const showMore$ = this.postService.readAllComments(lastComment.postId, lastComment.createdAt, this.size)
    this.loadComments.emit({observable$: showMore$, addComments: true});
  }

  deleteComment(comment: CommentModel) {
    const deleteObservable$ = this.postService.deleteComment(comment.id).pipe(
        switchMap(() => this.postService.readAllComments(comment.postId, this.comments[0].createdAt, this.size)),
        finalize(() => {
          this.closeCommentForm()
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
      switchMap(() => this.postService.readAllComments(this.selectedComment.postId, this.selectedComment.createdAt, this.size)),
      finalize(() => {
        this.closeCommentForm()
      })
    )
    this.loadComments.emit({observable$: editObservable$});
  }
}
