import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {StoreService} from '../services/store.service';
import {UserService} from '../services/user.service';
// import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from '../models/Error';
// import {SnackbarComponent} from '../snackbar/snackbar.component';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {Location} from '@angular/common';
import {STATE, User, USER_TYPE} from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  currentTheme: string = '';
  @Output()
  switchTheme = new EventEmitter<string>();
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User>

  constructor(private storeService: StoreService,
              private userService: UserService,
              private _location: Location,
              // private _snackBar: MatSnackBar
  ) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
    this.currentUser$ = this.storeService.currentUser$;
  }

  ngOnInit(): void {

  }

  switchAppTheme(e: MatButtonToggleChange) {
    this.switchTheme.emit(e.value);
  }

  backClicked() {
    this._location.back();
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
      }, (error: Error) => {
        // this._snackBar.openFromComponent(SnackbarComponent, {
        //   data: {
        //     message: error.message, type: 'ERROR'
        //   }
        // });
      });
  }

  checkUser(u: User) {
    return u?.type === USER_TYPE.SUPER && u?.state === STATE.ACTIVE;
  }
}
