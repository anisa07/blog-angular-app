import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StoreService} from './store.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.storeService.isLoggedIn$.pipe(
        map(loggedIn => loggedIn ? true : this.router.parseUrl('/user/login'))
      )
  }
}
