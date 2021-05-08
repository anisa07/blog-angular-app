import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {StoreService} from '../services/store.service';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from '../models/Error';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedOut$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private storeService: StoreService, private userService: UserService, private _snackBar: MatSnackBar) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
    this.isLoggedOut$ = this.storeService.isLoggedOut$;
  }

  ngOnInit(): void {

  }


  logout() {
    this.userService.logout().subscribe(
      () => {
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }
}
