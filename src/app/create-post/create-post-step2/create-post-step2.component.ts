import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyValueValidator } from 'src/app/validators/empty-value-validator';

@Component({
  selector: 'create-post-step2',
  templateUrl: './create-post-step2.component.html',
  styleUrls: ['./create-post-step2.component.scss']
})
export class CreatePostStep2Component implements OnInit {
  form: FormGroup;
  text: FormControl;

  constructor() {
    this.text = new FormControl('', {
      validators: [Validators.required, emptyValueValidator]
    })
    this.form = new FormGroup({
      text: this.text
    });
  }

  ngOnInit(): void {
   
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
