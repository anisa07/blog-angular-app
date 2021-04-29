import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {StoreService} from './services/store.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from './models/Error';
import {SnackbarComponent} from './components/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-angular-app';

  constructor(private userService: UserService, private storeService: StoreService, private _snackBar: MatSnackBar) {
    this.userService.isAuth()
      .subscribe((response) => {
        this.storeService.setLoggedState(response);
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      })
  }
}
