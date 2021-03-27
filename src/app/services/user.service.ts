import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url-service';
import { Signup } from '../models/Signup';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  signup(data: Signup) {
    return this.http.post(this.urlService.signupUrl, data);
  }
}
