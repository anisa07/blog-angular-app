import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss']
})
export class HttpErrorComponent implements OnInit {

  @Input() errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
