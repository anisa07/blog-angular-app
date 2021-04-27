import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorComponent } from './http-error/http-error.component';
import { CustomBaseComponent } from './custom-base/custom-base.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    HttpErrorComponent,
    FileUploadComponent,
    CustomBaseComponent,
    DialogComponent,
    SnackbarComponent,
  ],
  exports: [
    HttpErrorComponent,
    FileUploadComponent,
    CustomBaseComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ComponentsModule { }
