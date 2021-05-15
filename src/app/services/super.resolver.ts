import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import {AllPosts, PostService} from './post.service';
import {AllUsers, UserService} from './user.service';

@Injectable()
export class SuperResolver implements Resolve<[AllUsers, AllPosts]> {
  constructor(private postService: PostService, private userService: UserService) { }

  resolve(): Observable<[AllUsers, AllPosts]> {
    const readPosts = () => this.postService.readPosts().pipe(
      take(1),
      catchError((e) => of(e))
    )

    const getUsers = () => this.userService.getUsers().pipe(
      take(1),
      catchError((e) => of(e))
    )

    return forkJoin([getUsers(), readPosts()])
  }
}
