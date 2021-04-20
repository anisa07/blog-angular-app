import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';

@Component({
  selector: 'create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  @Output()
  leaveComment = new EventEmitter<{[key: string]: string}>();
  commentForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, emptyValueValidator]],
    })
  }

  get comment() {
    return this.commentForm.controls['comment'];
  }

  getCommentErrorMessage() {
    if (this.comment.hasError('required')) {
      return 'This field is required';
    }
    if (this.comment.errors.cannotContainSpace) {
      return "Seems this filed has only spaces"
    }
    return ""
  }

  submit() {
    this.leaveComment.emit(this.commentForm.value)
  }
}
