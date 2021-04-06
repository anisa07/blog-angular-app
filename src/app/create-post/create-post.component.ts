import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';

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

  constructor(private postService: PostService) {
  
  }

  onSave(): void {
    const formData: FormData = new FormData();
    formData.append('labels', JSON.stringify(this.formStep3.form.value.labels));
    formData.append('text', this.formStep2.form.value.text);
    formData.append('title', this.formStep1.form.value.title);

    const file: File = this.formStep4.form.value.file;
    if (file) {
      formData.append('image', file, file.name);
    }

    this.postService.createPost(formData).subscribe((response) => {
      console.log(response)
    })
  }
}
