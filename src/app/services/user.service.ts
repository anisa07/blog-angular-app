import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url-service';
import { Signup } from '../models/Signup';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  signup(data: Signup) {
    return this.http.post(this.urlService.signupUrl, data);
  }

  login(data: Login) {
    return this.http.post(this.urlService.loginUrl, data);
  }
}
