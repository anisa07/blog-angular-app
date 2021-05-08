import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private url: string =  'http://localhost:3000';
  signupUrl: string = this.url + '/signup';
  loginUrl: string = this.url + '/login';
  logoutUrl: string = this.url + '/logout';
  postTagUrl: string = this.url + '/label';
  postUrl: string = this.url + '/post';
  authUrl: string = this.url + '/auth';
  likeUrl: string = this.url + '/like';
  commentUrl: string = this.url + '/comment';
  userInfoUrl: string = this.url + '/user-info';
  userPhotoUrl: string = this.url + '/user-photo';
  followUrl: string = this.url + '/follow'
}
