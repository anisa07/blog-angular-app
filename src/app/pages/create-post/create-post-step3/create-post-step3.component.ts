import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Label } from '../../../models/Label';
import { PostService } from '../../../services/post.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'create-post-step3',
  templateUrl: './create-post-step3.component.html',
  styleUrls: ['./create-post-step3.component.scss']
})
export class CreatePostStep3Component implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  form: FormGroup;
  labels: Label[] = [];

  constructor(private postService: PostService) {
    this.form = new FormGroup({
      label: new FormControl('', Validators.required),
      labels: new FormControl('')
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.postService.createLabel(value.trim()).subscribe((l: Label) => {
        this.labels = [...this.labels, l];
        this.form.controls['labels'].setValue([...this.labels])
      })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Label): void {
    const index = this.labels.indexOf(fruit);

    if (index >= 0) {
      this.labels.splice(index, 1);
      this.form.controls['labels'].setValue([...this.labels]);
    }
  }

  ngOnInit(): void {}

  get labelsControl() {
    return this.form.controls['label'];
  }

  getLabelErrorMessage() {
    const labelError = this.labelsControl?.errors || null;
    if (this.form.touched && labelError) {
      return "At least one post tag required"
    }
    return ""
  }
}