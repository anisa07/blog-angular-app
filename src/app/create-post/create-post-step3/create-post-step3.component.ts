import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Label } from 'src/app/models/Label';

@Component({
  selector: 'create-post-step3',
  templateUrl: './create-post-step3.component.html',
  styleUrls: ['./create-post-step3.component.scss']
})
export class CreatePostStep3Component implements OnInit {
  form: FormGroup;
  label: FormControl;
  labels: Label[] = [];
  
  constructor() {
    this.label = new FormControl('')
    this.form = new FormGroup({
      label: this.label
    });
  }

  ngOnInit(): void {
  }

  getLabelErrorMessage() {
    console.log(this.form)
    if (this.form.touched && this.labels.length === 0) {
      this.label.setErrors({'incorrect': true})
      // this.form.controls['email'].setErrors({'incorrect': true});
      return "At least one post topic required"
    }
    this.label.setErrors(null)
    return ""
  }
}
