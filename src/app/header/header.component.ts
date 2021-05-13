import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {StoreService} from '../services/store.service';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from '../models/Error';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {Location} from '@angular/common';

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
  isLoggedOut$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private storeService: StoreService,
              private userService: UserService,
              private _location: Location,
              private _snackBar: MatSnackBar) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
    this.isLoggedOut$ = this.storeService.isLoggedOut$;
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
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }
}
