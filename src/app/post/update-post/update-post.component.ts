import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';
import {Post} from '../../models/Post';
import {HttpErrorResponse} from '@angular/common/http';
import {Label} from '../../models/Label';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {PostService} from '../../services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';

@Component({
  selector: 'update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  form: FormGroup;
  postData: any[];
  post: Post;
  submitCalled: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private postService: PostService, private router: Router, private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.postData = this.route.snapshot.data['postData'];
    if (!(this.postData[0] instanceof HttpErrorResponse)) {
      this.post = this.postData[0];
    }

    this.form = this.fb.group({
      title: [this.post.title, [
        Validators.required,
        emptyValueValidator
      ]],
      text: [this.post.text, [Validators.required, emptyValueValidator]],
      fileUpload: [this.post.filename]
    });
  }

  get title() {
    return this.form.controls['title'];
  }

  get text() {
    return this.form.controls['text'];
  }

  get fileUpload() {
    return this.form.controls['fileUpload'];
  }

  getTitleErrorMessage(): string {
    if (this.title.errors.required) {
      return 'This filed is required';
    }
    if (this.title.errors.cannotContainSpace) {
      return 'Seems this filed has only spaces';
    }
    return '';
  }

  getTextErrorMessage(): string {
    if (this.text.errors.required) {
      return 'This filed is required';
    }
    if (this.text.errors.cannotContainSpace) {
      return 'Seems this filed has only spaces';
    }
    return '';
  }

  confirmExit() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: 'Are you sure you want to exit update post page without saving changes?',
      }
    });

    return dialogRef.afterClosed();
  }


  ngOnInit(): void {
    // console.log(this.route.snapshot.data['postData']);
  }

  onSave() {
    this.submitCalled = true;
    const formData: FormData = new FormData();
    formData.append('labels', JSON.stringify(this.post.labels));
    formData.append('text', this.form.value.text);
    formData.append('title', this.form.value.title);
    formData.append('id', this.post.id);

    const file: File = this.form.value.fileUpload;

    if (file) {
      formData.append('image', file, file.name);
    }

    this.postService.updatePost(formData)
      .subscribe((response) => {
        this.router.navigate(['post', response.id]);
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }
}
