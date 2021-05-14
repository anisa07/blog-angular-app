import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './user.service';
import {StoreService} from './store.service';

@Injectable()
export class UserResolver implements Resolve<[User]> {
  constructor(private userService: UserService, private storeService: StoreService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[User]> {
    const id = route.paramMap.get("id");

    const getUserInfo$ = this.userService.getUserInfo(id).pipe(
      take(1),
      catchError((e) => of(e))
    )

    const getUserInfo = () => {
      if (!id) {
        return this.storeService.currentUser$.pipe(
          take(1),
          switchMap(response => {
            if (response) {
              return of(response)
            } else {
              return getUserInfo$
            }
          })
        )
      }
      return getUserInfo$
    }

    return getUserInfo();
  }
}
