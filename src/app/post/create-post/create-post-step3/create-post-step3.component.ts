import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Label } from '../../../models/Label';
import { PostService } from '../../../services/post.service';
import { emptyLabelsValidator } from '../../../utils/validators/empty-labels-validator';

@Component({
  selector: 'create-post-step3',
  templateUrl: './create-post-step3.component.html',
  styleUrls: ['./create-post-step3.component.scss']
})
export class CreatePostStep3Component implements OnInit {
  form: FormGroup;
  labels: Label[] = [];

  constructor(private postService: PostService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      labels: [[], emptyLabelsValidator]
    });
  }
}
