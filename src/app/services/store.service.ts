import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AllPosts} from './post.service';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private loggedSubject = new BehaviorSubject<boolean>(false);
  private posts = new BehaviorSubject<AllPosts>({posts: [], hasNextPage: false, totalDocs: 0})
  private currentUser = new BehaviorSubject<User>(null);

  posts$: Observable<AllPosts> = this.posts.asObservable();
  currentUser$: Observable<User> = this.currentUser.asObservable();
  isLoggedIn$: Observable<boolean> = this.loggedSubject.asObservable();
  isLoggedOut$: Observable<boolean>;

  constructor() {
    this.isLoggedOut$ = this.isLoggedIn$.pipe(
      map(loggedIn => {
      return !loggedIn
    }));
  }

  setLoggedState(state: boolean) {
    this.loggedSubject.next(state);
  }

  setPosts(state: AllPosts) {
    this.posts.next(state);
  }

  setCurrentUser(state: User) {
    this.currentUser.next(state);
  }
}
