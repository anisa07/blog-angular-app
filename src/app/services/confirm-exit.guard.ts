import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {CreatePostComponent} from '../post/create-post/create-post.component';

@Injectable()
export class ConfirmExitGuard implements CanDeactivate<CreatePostComponent> {
  constructor(private userService: UserService) {
  };

  canDeactivate(component: CreatePostComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    return component.confirmExit();
  }
}
