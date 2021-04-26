import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserService } from "./user.service";
import {StoreService} from './store.service';

@Injectable()
export class NotLoggedInUsersGuard implements CanActivate {
  constructor(private storeService: StoreService) {};

  canActivate() {
    return this.storeService.isLoggedOut$;
  }
}
