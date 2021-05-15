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
import {AllPosts} from './post.service';
import {Post} from '../models/Post';

interface LoginResponse {
  id: string,
  token: string,
  status: string
}

interface UsersQuery {
  text?: string,
  size?: number,
  page?: number,
}

export interface AllUsers {
  users: User[],
  hasNextPage: boolean,
  totalDocs: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService, private storeService: StoreService) {

  }

  createHeaders() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ''}`,
      'id': userObject.id || ''
    });
  }

  signup(data: Signup) {
    return this.http.post(this.urlService.signupUrl, data)
      .pipe(tap((response: LoginResponse) => {
        this.storageService.setData(STORE_USER_KEY, response || '');
        this.storeService.setLoggedState(true);
        this.getUserInfo(response.id).subscribe(response2 => this.storeService.setCurrentUser(response2));
      }));
  }

  login(data: Login) {
    return this.http.post(this.urlService.loginUrl, data)
      .pipe(
        tap((response: LoginResponse) => {
          this.storageService.setData(STORE_USER_KEY, response || '');
          this.storeService.setLoggedState(true);
          this.getUserInfo(response.id).subscribe(response2 => this.storeService.setCurrentUser(response2));
        })
      );
  }

  logout() {
    const headers = this.createHeaders();
    return this.http.post(this.urlService.logoutUrl, {}, {headers})
      .pipe(
        tap(() => {
          this.storageService.setData(STORE_USER_KEY, '');
          this.storeService.setLoggedState(false);
          this.storeService.setCurrentUser(null);
        }));
  }

  isAuth() {
    const headers = this.createHeaders();
    return this.http.get<boolean>(this.urlService.authUrl, {headers})
  }

  getUserId() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return userObject?.id;
  }

  getUserInfo(id?: string) {
    const headers = this.createHeaders();
    return this.http.get<User>(`${this.urlService.userInfoUrl}/${id || this.getUserId()}`, {headers});
  }

  getUserPhoto(filename: string) {
    return `${this.urlService.userPhotoUrl}/${filename}`;
  }

  deleteUser() {
    const headers = this.createHeaders();
    return this.http.delete(this.urlService.userUrl, {headers});
  }

  doIFollowUser(followId: string) {
    const headers = this.createHeaders();
    return this.http.get<boolean>(`${this.urlService.followUrl}/${followId}`, {headers});
  }

  followUser(followId: string) {
    const headers = this.createHeaders();
    return this.http.post(`${this.urlService.followUrl}`, {follow: followId}, {headers});
  }

  unFollowUser(followId: string) {
    const headers = this.createHeaders();
    return this.http.delete(`${this.urlService.followUrl}/${followId}`, {headers});
  }

  updateUser(formData: FormData) {
    const options = {headers: this.createHeaders()};
    return this.http.post(`${this.urlService.userInfoUrl}`, formData, options);
  }

  manageUser(user: User){
    const options = {headers: this.createHeaders()};
    return this.http.post(`${this.urlService.manageUserUrl}`, user, options);
  }

  getFollowPosts(page: number, size: number) {
    const options = {headers: this.createHeaders()};
    return this.http.get<AllPosts>(`${this.urlService.followUrl}/posts/?size=${size}&page=${page}`, options);
  }

  getUsers(query?: UsersQuery) {
    const options = {headers: this.createHeaders()};
    let url = this.urlService.usersUrl;
    if (query) {
      url = `${url}/?searchText=${query.text || ''}&size=${query.size || 10}&page=${query.page || 1}`
    }

    return this.http.get<AllUsers>(url, options);
  }
}
