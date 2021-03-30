import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private url: string =  'http://localhost:3000';
  signupUrl: string = this.url + '/signup';
  loginUrl: string = this.url + '/login'
}
