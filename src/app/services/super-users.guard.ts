import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';
import {USER_TYPE} from '../models/User';

@Injectable()
export class SuperUsersGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userService.getUserInfo()
      .pipe(
        map(response => response?.type === USER_TYPE.SUPER ? true : this.router.parseUrl('/post'))
      )
  }
}
