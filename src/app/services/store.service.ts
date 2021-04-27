import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from '../models/Post';
import {AllPosts} from './post.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private loggedSubject = new BehaviorSubject<boolean>(false);
  private posts = new BehaviorSubject<AllPosts>({posts: [], showMorePosts: false})

  posts$: Observable<AllPosts> = this.posts.asObservable();
  isLoggedIn$: Observable<boolean> = this.loggedSubject.asObservable();
  isLoggedOut$: Observable<boolean>;

  constructor() {
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
  }

  setLoggedState(state: boolean) {
    this.loggedSubject.next(state);
  }

  setPosts(state: AllPosts) {
    this.posts.next(state);
  }
}
