import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from './url-service';
import {Signup} from '../models/Signup';
import {Login} from '../models/Login';
import {LocalstoreService} from './localstore.service';
import {STORE_USER_KEY} from '../utils/constants';
import {switchMap, tap} from 'rxjs/operators';
import {StoreService} from './store.service';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService, private storeService: StoreService) {

  }

  createHeaders() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ""}`,
      'id': userObject.id || ""
    })
  }

  signup(data: Signup) {
    return this.http.post(this.urlService.signupUrl, data)
      .pipe(tap((response) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.storeService.setLoggedState(true);
      }));
  }

  login(data: Login) {
    return this.http.post(this.urlService.loginUrl, data)
      .pipe(tap((response) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.storeService.setLoggedState(true);
      }));
  }

  logout() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    const headers = this.createHeaders();
    return this.http.post(this.urlService.logoutUrl, {}, {headers})
      .pipe(tap((response) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.storeService.setLoggedState(false);
      }));
  }

  isAuth() {
    const headers = this.createHeaders();
    return this.http.get<boolean>(this.urlService.authUrl, {headers});
  }

  getUserId() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return userObject?.id;
  }

  getUserInfo(id?: string) {
    const headers = this.createHeaders();
    return this.http.get<User>(`${this.urlService.userInfoUrl}/${id  || this.getUserId()}`, {headers});
  }

  getUserPhoto(filename: string) {
    return `${this.urlService.userPhotoUrl}/${filename}`;
  }

  doIFollowUser(followId: string) {
    const headers = this.createHeaders();
    return this.http.get<boolean>(`${this.urlService.followUrl}/${followId}`, {headers})
  }

  followUser(followId: string) {
    const headers = this.createHeaders();
    return this.http.post(`${this.urlService.followUrl}`, {follow: followId}, {headers});
  }

  unFollowUser(followId: string) {
    const headers = this.createHeaders();
    return this.http.delete(`${this.urlService.followUrl}/${followId}`, {headers})
  }
}
