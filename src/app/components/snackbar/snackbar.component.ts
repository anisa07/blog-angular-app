import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

export enum SnackBarType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface SnackBarData {
  message: string;
  type?: SnackBarType;
}

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData, private _snackRef: MatSnackBarRef<SnackbarComponent>,) { }

  ngOnInit(): void {

  }

  dismiss() {
    this._snackRef.dismiss()
  }
}
