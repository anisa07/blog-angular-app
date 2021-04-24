import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url-service';
import { Signup } from '../models/Signup';
import { Login } from '../models/Login';
import { LocalstoreService } from './localstore.service';
import { STORE_USER_KEY } from '../utils/constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this.subject.asObservable();
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService) {
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    this.isAuth()
      .subscribe((response) => {
        this.subject.next(response);
      }, () => {
        // TODO emit common http error
      })

  }

  ngOnInit() {

  }

  signup(data: Signup) {
    return this.http.post(this.urlService.signupUrl, data)
      .pipe(tap((response) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.subject.next(true);
      }))
  }

  login(data: Login) {
    return this.http.post(this.urlService.loginUrl, data)
      .pipe(tap((response) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.subject.next(true);
      }))
  }

  isAuth() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ""}`,
      'id': userObject.id || ""
    });
    return this.http.get<boolean>(this.urlService.authUrl, {headers})
  }

  getUserId() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return userObject.id;
  }
}
