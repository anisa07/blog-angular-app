import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {CreatePostComponent} from '../post/create-post/create-post.component';
import {Observable} from 'rxjs';

@Injectable()
export class ConfirmExitGuard implements CanDeactivate<CreatePostComponent> {
  constructor() {
  };

  canDeactivate(component: CreatePostComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> {
    return component.confirmExit();
  }
}
