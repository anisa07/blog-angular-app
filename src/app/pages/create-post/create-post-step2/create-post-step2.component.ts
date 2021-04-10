import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyValueValidator } from '../../../utils/validators/empty-value-validator';

@Component({
  selector: 'create-post-step2',
  templateUrl: './create-post-step2.component.html',
  styleUrls: ['./create-post-step2.component.scss']
})
export class CreatePostStep2Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      text: ['', [Validators.required, emptyValueValidator]]
    });
  }

  ngOnInit(): void {
   
  }

  get text() {
    return this.form.controls['text'];
  }

  getTextErrorMessage(): string {
    if (this.text.errors.required) {
      return "This filed is required"
    }
    if (this.text.errors.cannotContainSpace) {
      return "Seems this filed has only spaces"
    }
    return "";
  }
}
