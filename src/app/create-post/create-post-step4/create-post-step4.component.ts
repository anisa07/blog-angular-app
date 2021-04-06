import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-post-step4',
  templateUrl: './create-post-step4.component.html',
  styleUrls: ['./create-post-step4.component.scss']
})
export class CreatePostStep4Component implements OnInit {
  form: FormGroup;
  file: FormControl;

  constructor() {
    this.file = new FormControl('');
    this.form = new FormGroup({
      file: this.file
    }); 
  }

  onFileUpload(f: File) {
    if (f) {
      this.form.controls['file'].setValue(f);
    }
  }

  ngOnInit(): void {
  }
}
