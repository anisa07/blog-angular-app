import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userService.isAuth().pipe(
      map(loggedIn => loggedIn ? true : this.router.parseUrl('/user/login'))
    )
  }
}
