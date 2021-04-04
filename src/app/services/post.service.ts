import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORE_USER_KEY } from '../utils/constants';
import { LocalstoreService } from './localstore.service';
import { UrlService } from './url-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService) { }

  createLabel(label: string) {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userObject.token}`,
      'id': userObject.id
    })
    return this.http.post(this.urlService.postTagUrl, {
      name: label
    }, {headers: headers});
  }

  // signup(data: Signup) {
  //   return this.http.post(this.urlService.signupUrl, data);
  // }

  // login(data: Login) {
  //   return this.http.post(this.urlService.loginUrl, data);
  // }
}
