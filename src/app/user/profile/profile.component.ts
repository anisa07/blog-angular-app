import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {StoreService} from '../../services/store.service';
import {Observable} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: User;
  image: string;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  iFollow$: Observable<boolean>
  showEditForm: boolean = false;
  page: number = 0;
  size: number = 10;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private storeService: StoreService,
              private _snackBar: MatSnackBar) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
    this.isLoggedOut$ = this.storeService.isLoggedOut$;
  }

  ngOnInit(): void {
    this.userData = this.route.snapshot.data['userInfo'];
    this.iFollow$ = this.checkFollow();

    if (this.userData.filename) {
      this.image = this.userService.getUserPhoto(this.userData.filename);
    }

    console.log(this.userData);
  }

  ownProfile() {
    return this.userService.getUserId() === this.userData.id;
  }

  onEdit() {
    this.showEditForm = !this.showEditForm;
  }

  onOpenFollowPosts() {
    this.showEditForm = false;
    this.page += 1;
    this.userService.getFollowPosts(this.page, this.size)
      .subscribe(response => {
        console.log('response', response)
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      })
  }

  onFollow() {
    this.userService.followUser(this.userData.id)
      .subscribe(() => {
        this.iFollow$ = this.checkFollow();
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }

  onUnFollow() {
    this.userService.unFollowUser(this.userData.id)
      .subscribe(() => {
        this.iFollow$ = this.checkFollow();
      }, (error: Error) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.message, type: 'ERROR'
          }
        });
      });
  }

  onDeleteProfile() {}

  checkFollow() {
    return this.userService.doIFollowUser(this.userData.id).pipe(shareReplay(1))
  }

  getUserInfo(id: string) {
    this.userService.getUserInfo(id).subscribe((response) => {
      this.showEditForm = false;
      if (response.filename) {
        this.image = this.userService.getUserPhoto(response.filename);
      }
      this.userData = response;
    }, (error: Error) => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: error.message, type: 'ERROR'
        }
      });
    })
  }
}
