import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'create-post-step4',
  templateUrl: './create-post-step4.component.html',
  styleUrls: ['./create-post-step4.component.scss'],
})
export class CreatePostStep4Component implements OnInit {
  form: FormGroup;
  fileUpload: FormControl;

  constructor() {
    this.fileUpload = new FormControl();
    this.form = new FormGroup({
      fileUpload: this.fileUpload
    }); 
  }
  
  ngOnInit(): void {
  }
}
