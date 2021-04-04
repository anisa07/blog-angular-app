import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValueValidator } from '../validators/empty-value-validator';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  postError: string = "";
  loading: boolean = false;

  constructor(private fb: FormBuilder) {
  
  }

  onSubmit(): void {}

  get title() {
    return this.postForm.controls['title']
  }

  get text() {
    return this.postForm.controls['text']
  }

  getTitleErrorMessage(): string {
    if (this.title.errors.required) {
      return "This filed is required"
    }
    if (this.title.errors.emptyValue) {
      return "Seems this filed has only spaces"
    }
    return ""
  }

  getTextErrorMessage(): string {
    if (this.text.errors.required) {
      return "This filed is required"
    }
    if (this.text.errors.emptyValue) {
      return "Seems this filed has only spaces"
    }
    return ""
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', {
        validators: [Validators.required, emptyValueValidator],
        updateOn: 'blur'
      }],
      text: ['', {
        validators: [Validators.required, emptyValueValidator],
        updateOn: 'blur'
      }]
    });
  }
}
