import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { UserService } from "./user.service";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.userService.isLoggedIn$.pipe(
        map(loggedIn => loggedIn ? true : this.router.parseUrl('/user/login'))
      )
  }
}
