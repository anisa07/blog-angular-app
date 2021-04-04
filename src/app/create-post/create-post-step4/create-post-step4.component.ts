import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'create-post-step4',
  templateUrl: './create-post-step4.component.html',
  styleUrls: ['./create-post-step4.component.scss']
})
export class CreatePostStep4Component implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({}); 
  }

  ngOnInit(): void {
  }

}
