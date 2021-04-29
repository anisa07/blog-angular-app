import { Injectable } from "@angular/core";
import {CanActivate, Router, UrlTree} from '@angular/router';
import { UserService } from "./user.service";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class NotLoggedInUsersGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  };

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAuth().pipe(
      map(loggedIn => !loggedIn ? true : this.router.parseUrl('/post'))
    )
  }
}
