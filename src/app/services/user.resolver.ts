import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable()
export class UserResolver implements Resolve<[User]> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[User]> {
    const id = route.paramMap.get("id");

    const getUserInfo = () => this.userService.getUserInfo(id).pipe(
      take(1),
      catchError((e) => of(e))
    )

    // const readLikesValue = (id: string) => this.postService.readLikesValue(id).pipe(
    //   take(1),
    //   catchError((e) => of(e))
    // )

    // const id = route.paramMap.get("id")

    return getUserInfo()
   // return forkJoin([readPost(id), readLikesValue(id)])
  }
}
