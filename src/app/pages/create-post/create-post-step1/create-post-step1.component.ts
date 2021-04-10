import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyValueValidator } from '../../../utils/validators/empty-value-validator';

@Component({
  selector: 'create-post-step1',
  templateUrl: './create-post-step1.component.html',
  styleUrls: ['./create-post-step1.component.scss']
})
export class CreatePostStep1Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        emptyValueValidator
      ]]
    })
   }

  ngOnInit(): void {
    
  }

  get title() {
    return this.form.controls['title'];
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
