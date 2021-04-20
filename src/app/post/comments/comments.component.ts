import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from '../../models/CommentModel';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input()
  comments: CommentModel[] = [];
  @Input()
  showMoreButton: boolean =  false;
  @Output()
  showMoreComments = new EventEmitter<{size: number, createAt: number}>();
  // edit, delete
  currentUserId = undefined;
  isAuth = true;

  size: number = 10;

  constructor(private userService: UserService) {
    this.currentUserId = userService.getUserId();
  }

  isCommentAuthor(authorId: string) {
    return authorId === this.currentUserId;
  }

  ngOnInit(): void {
    this.userService.isAuth().subscribe((response) => this.isAuth = response)
  }
}
