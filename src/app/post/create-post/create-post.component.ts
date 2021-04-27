import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  @ViewChild('step1', {static: true}) formStep1: NgForm;
  @ViewChild('step2', {static: true}) formStep2: NgForm;
  @ViewChild('step3', {static: true}) formStep3: NgForm;
  @ViewChild('step4', {static: true}) formStep4: NgForm;

  loading: boolean = false;
  submitCalled: boolean = false;

  constructor(private postService: PostService,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  confirmExit() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: 'Are you sure you want to exit create post page without saving changes?',
      }
    });

    return dialogRef.afterClosed();
  }

  onSave(): void {
    this.submitCalled = true;
    const formData: FormData = new FormData();
    formData.append('labels', JSON.stringify(this.formStep3.form.value.labels));
    formData.append('text', this.formStep2.form.value.text);
    formData.append('title', this.formStep1.form.value.title);

    const file: File = this.formStep4.form.value.fileUpload;
    if (file) {
      formData.append('image', file, file.name);
    }

    this.postService.createPost(formData)
      .subscribe((response: { id: string }) => {
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
