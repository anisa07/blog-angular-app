import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  @ViewChild('step1', { static: true }) formStep1: NgForm;
  @ViewChild('step2', { static: true }) formStep2: NgForm;
  @ViewChild('step3', { static: true }) formStep3: NgForm;
  @ViewChild('step4', { static: true }) formStep4: NgForm;

  postError: string = "";
  loading: boolean = false;

  constructor() {
  
  }

  onSave(): void {
    console.log(this.formStep1.form.value);
    console.log(this.formStep2.form.value);
    console.log(this.formStep3.form.value)
  }


}
