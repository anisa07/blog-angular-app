import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  filename: string = "";

  @Output() uploadFileEvent = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpload(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.uploadFileEvent.emit(file);
    }
  }
}
