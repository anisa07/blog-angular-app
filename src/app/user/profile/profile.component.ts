import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {STATE, User, USER_TYPE} from '../../models/User';
import {UserService} from '../../services/user.service';
import {StoreService} from '../../services/store.service';
import {Observable, of} from 'rxjs';
import {shareReplay, switchMap, take} from 'rxjs/operators';
import {Post} from '../../models/Post';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: User;
  currentUser: User;
  posts: Post[] = [];
  users: Record<string, string>[] = [];
  showMorePosts: boolean = false;
  showMoreUsers: boolean = false;
  image: string;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  iFollow$: Observable<boolean>;
  showEditForm: boolean = false;
  postPage: number = 0;
  postSize: number = 10;
  followPage: number = 0;
  followSize: number = 10;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private userService: UserService,
              private storeService: StoreService,
              // private _snackBar: MatSnackBar,
              ) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
    this.isLoggedOut$ = this.storeService.isLoggedOut$;
  }

  ngOnInit(): void {
    this.userData = this.route.snapshot.data['userInfo'];
    this.iFollow$ = this.ownProfile() ? undefined : this.checkFollow();

    if (this.userData.filename) {
      this.image = this.userService.getUserPhoto(this.userData.filename);
    }

    this.storeService.currentUser$.subscribe(response => {
      this.currentUser = response;
    });
  }

  superUser() {
    return this.currentUser?.type === USER_TYPE.SUPER && this.currentUser?.state === STATE.ACTIVE && this.userData?.type === USER_TYPE.USER
  }

  ownProfile() {
    return this.userService.getUserId() === this.userData.id
  }

  onEdit() {
    this.showEditForm = !this.showEditForm;
  }

  onOpenFollowPosts() {
    this.showEditForm = false;
    this.postPage += 1;
    this.userService.getFollowPosts(this.postPage, this.postSize)
      .subscribe(response => {
        this.posts = [...this.posts, ...response.posts];
        this.showMorePosts = response.hasNextPage;
      });
  }

  onShowAllFollowUsers() {
    this.followPage +=1;
    this.userService.getAllFollowUsers(this.followPage, this.followSize)
      .subscribe(response => {
        this.users = [...this.users, ...response.users];
        this.showMoreUsers = response.hasNextPage;
      });
  }

  onFollow() {
    this.userService.followUser(this.userData.id)
      .subscribe(() => {
        this.iFollow$ = this.checkFollow();
      });
  }

  onUnFollow() {
    this.userService.unFollowUser(this.userData.id)
      .subscribe(() => {
        this.iFollow$ = this.checkFollow();
      });
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: 'Are you sure you want to delete this user?',
      }
    });

    return dialogRef.afterClosed();
  }

  onDeleteProfile() {
    this.confirmDelete().pipe(
      take(1),
      switchMap((val) => {
        if (val) {
          return this.userService.deleteUser(this.userData.id);
        } else {
          return of(false);
        }
      })
    ).subscribe((response) => {
      if (response === null) {
        this.router.navigate(['post']);
      }
    });
  }

  checkFollow() {
    return this.userService.doIFollowUser(this.userData.id).pipe(shareReplay(1));
  }

  getUserInfo(id: string) {
    this.userService.getUserInfo(id).subscribe((response) => {
      if(this.userService.getUserId() === id) {
        this.storeService.setCurrentUser(response);
      }
      this.showEditForm = false;
      if (response.filename) {
        this.image = this.userService.getUserPhoto(response.filename);
      }
      this.userData = response;
    });
  }
}
