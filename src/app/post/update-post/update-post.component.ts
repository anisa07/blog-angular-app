import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';
import {Post} from '../../models/Post';
import {HttpErrorResponse} from '@angular/common/http';
import {Error} from '../../models/Error';
// import {SnackbarComponent} from '../../snackbar/snackbar.component';
import {PostService} from '../../services/post.service';
// import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {emptyLabelsValidator} from '../../utils/validators/empty-labels-validator';

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

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private postService: PostService,
              private router: Router,
              // private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
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

  get labels() {
    return this.form.controls['labels'];
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
      labels: [this.post.labels, [emptyLabelsValidator]],
      fileUpload: [this.post.filename]
    });
  }

  onSave() {
    this.submitCalled = true;
    const formData: FormData = new FormData();
    formData.append('labels', JSON.stringify(this.labels.value));
    formData.append('text', this.text.value);
    formData.append('title', this.title.value);
    formData.append('id', this.post.id);

    const file: File = this.form.value.fileUpload;

    if (file && file instanceof File) {
      formData.append('image', file, file.name);
    } else if (file && typeof file === "string") {
      formData.append('filename', file);
    }

    this.postService.updatePost(formData)
      .subscribe((response) => {
        this.router.navigate(['post', response.id]);
      }, (error: Error) => {
        // this._snackBar.openFromComponent(SnackbarComponent, {
        //   data: {
        //     message: error.message, type: 'ERROR'
        //   }
        // });
      });
  }
}
