import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from './url-service';
import {Signup} from '../models/Signup';
import {Login} from '../models/Login';
import {LocalstoreService} from './localstore.service';
import {STORE_USER_KEY} from '../utils/constants';
import {switchMap, tap} from 'rxjs/operators';
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService, private storeService: StoreService) {

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
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ''}`,
      'id': userObject.id || ''
    });
    return this.http.post(this.urlService.logoutUrl, {}, {headers})
      .pipe(tap((response) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.storeService.setLoggedState(false);
      }));
  }

  isAuth() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ''}`,
      'id': userObject.id || ''
    });
    return this.http.get<boolean>(this.urlService.authUrl, {headers});
  }

  getUserId() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return userObject?.id;
  }
}
