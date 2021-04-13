import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorComponent } from './http-error/http-error.component';
import { CustomBaseComponent } from './custom-base/custom-base.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HttpErrorComponent,
    FileUploadComponent,
    CustomBaseComponent,
  ],
  exports: [
    HttpErrorComponent,
    FileUploadComponent,
    CustomBaseComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
