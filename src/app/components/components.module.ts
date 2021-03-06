import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomBaseComponent} from './custom-base/custom-base.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MaterialModule} from '../material/material.module';
import {DialogComponent} from './dialog/dialog.component';
import {LabelComponent} from './label/label.component';
import {SnackbarComponent} from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    CustomBaseComponent,
    DialogComponent,
    LabelComponent,
    SnackbarComponent
  ],
  exports: [
    FileUploadComponent,
    CustomBaseComponent,
    LabelComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ComponentsModule {
}
