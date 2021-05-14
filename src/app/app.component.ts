import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {StoreService} from './services/store.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from './models/Error';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {LocalstoreService} from './services/localstore.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTheme: string = 'dark';
  title = 'blog-angular-app';

  constructor(private userService: UserService,
              private storeService: StoreService,
              private _snackBar: MatSnackBar,
              private localstroreService: LocalstoreService,
              private overlay: OverlayContainer
              ) {}

  ngOnInit(): void {
    this.userService.isAuth()
      .subscribe((response) => {
        this.storeService.setLoggedState(response);
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });

    const theme = this.localstroreService.getTheme() || 'dark';
    this.switchTheme(theme);
  }

  switchTheme(theme: string) {
    this.appTheme = theme;
    this.localstroreService.setTheme(theme);
    if (theme === 'light') {
      this.overlay.getContainerElement().classList.add('alternate-theme');
    } else {
      this.overlay.getContainerElement().classList.remove('alternate-theme');
    }
  }
}
