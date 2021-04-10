import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyValueValidator } from '../../../utils/validators/empty-value-validator';

@Component({
  selector: 'create-post-step1',
  templateUrl: './create-post-step1.component.html',
  styleUrls: ['./create-post-step1.component.scss']
})
export class CreatePostStep1Component implements OnInit {
  form: FormGroup;
  title: FormControl;

  constructor() {
    this.title = new FormControl('', {
      validators: [
        Validators.required,
        emptyValueValidator
      ]
    })
    this.form = new FormGroup({
      title: this.title
    })
   }

  ngOnInit(): void {
    
  }

  getTitleErrorMessage(): string {
    if (this.title.errors.required) {
      return "This filed is required"
    }
    if (this.title.errors.cannotContainSpace) {
      return "Seems this filed has only spaces"
    }
    return ""
  }

}
