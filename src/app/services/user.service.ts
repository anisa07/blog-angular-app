import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url-service';
import {Signup} from '../models/Signup';
import {Login} from '../models/Login';
import {LocalstoreService} from './localstore.service';
import {STORE_USER_KEY} from '../utils/constants';
import {tap} from 'rxjs/operators';
import {StoreService} from './store.service';
import {User} from '../models/User';
import {AllPosts} from './post.service';
import {ChangePassword} from '../models/ChangePassword';

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
    return this.http.post(this.urlService.logoutUrl, {})
      .pipe(
        tap(() => {
          this.storageService.setData(STORE_USER_KEY, '');
          this.storeService.setLoggedState(false);
          this.storeService.setCurrentUser(null);
        }));
  }

  isAuth() {
    return this.http.get<boolean>(this.urlService.authUrl)
  }

  getUserId() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return userObject?.id;
  }

  getUserInfo(id?: string) {
    return this.http.get<User>(`${this.urlService.userInfoUrl}/${id || this.getUserId()}`);
  }

  getUserPhoto(filename: string) {
    return `${this.urlService.userPhotoUrl}/${filename}`;
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.urlService.userUrl}/${id}`);
  }

  doIFollowUser(followId: string) {
    return this.http.get<boolean>(`${this.urlService.followUrl}/${followId}`);
  }

  followUser(followId: string) {
    return this.http.post(`${this.urlService.followUrl}`, {follow: followId});
  }

  unFollowUser(followId: string) {
    return this.http.delete(`${this.urlService.followUrl}/${followId}`);
  }

  updateUser(formData: FormData) {
    return this.http.post(`${this.urlService.userInfoUrl}`, formData);
  }

  manageUser(user: User){
    return this.http.post(`${this.urlService.manageUserUrl}`, user);
  }

  getFollowPosts(page: number, size: number) {
    return this.http.get<AllPosts>(`${this.urlService.followUrl}/posts/?size=${size}&page=${page}`);
  }

  getUsers(query?: UsersQuery) {
    let url = this.urlService.userUrl;
    if (query) {
      url = `${url}/?searchText=${query.text || ''}&size=${query.size || 10}&page=${query.page || 1}`
    }

    return this.http.get<AllUsers>(url);
  }

  forgotPassword(email: string) {
    return this.http.post(this.urlService.forgotPasswordUrl, {email})
  }

  changePassword(changePassword: ChangePassword) {
    return this.http.post(this.urlService.changePasswordUrl, changePassword);
  }
}
