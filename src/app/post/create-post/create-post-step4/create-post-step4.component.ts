import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-post-step4',
  templateUrl: './create-post-step4.component.html',
  styleUrls: ['./create-post-step4.component.scss'],
})
export class CreatePostStep4Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fileUpload: ['']
    }); 
  }
  
  get fileUpload() {
    return this.form.controls['fileUpload']
  }

  ngOnInit(): void {
  }
}
