import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AllUsers, UserService} from '../../services/user.service';
import {StoreService} from '../../services/store.service';
// import {MatSnackBar} from '@angular/material/snack-bar';
import {AllPosts, PostService} from '../../services/post.service';
import {User} from '../../models/User';
import {Post} from '../../models/Post';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Error} from '../../models/Error';
// import {SnackbarComponent} from '../../snackbar/snackbar.component';
import {debounce, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'super-user-page',
  templateUrl: './super-user-page.component.html',
  styleUrls: ['./super-user-page.component.scss']
})
export class SuperUserPageComponent implements OnInit {
  userForm: FormGroup
  postForm: FormGroup
  superData: [AllUsers, AllPosts]
  users: User[];
  hasNextUsersPage: boolean = false;
  userPage: number = 1;
  posts: Post[];
  hasNextPostsPage: boolean = false;
  postPage: number = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private postService: PostService,
              private userService: UserService,
              private storeService: StoreService,
              // private _snackBar: MatSnackBar,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.superData = this.route.snapshot.data['superData'];
    this.users = this.superData[0].users;
    this.hasNextUsersPage = this.superData[0].hasNextPage;
    this.posts = this.superData[1].posts;
    this.hasNextPostsPage = this.superData[1].hasNextPage;

    this.userForm = this.fb.group({
      userSearch: ['']
    });

    this.postForm = this.fb.group({
      postSearch: ['']
    });

    this.onUserFormChanges();
    this.onPostFormChanges();
  }

  onPostFormChanges(): void {
    this.postForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounce(() => timer(700)),
      switchMap(v => {
          this.postPage = 1;
          return this.postService.readPosts({
            page: this.userPage,
            searchText: v.postSearch
          })
        }
      )
    ).subscribe((response) => {
      this.posts = response.posts;
      this.hasNextPostsPage = response.hasNextPage;
    }, (error: Error) => {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: error.message, type: 'ERROR'
      //   }
      // });
    })
  }

  onUserFormChanges():void {
    this.userForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounce(() => timer(700)),
      switchMap(v => {
          this.userPage = 1;
          return this.userService.getUsers({
            page: this.userPage,
            text: v.userSearch
          })
        }
      )
    ).subscribe((response) => {
      this.users = response.users;
      this.hasNextUsersPage = response.hasNextPage;
    }, (error: Error) => {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: error.message, type: 'ERROR'
      //   }
      // });
    })
  }

  get userSearch() {
    return this.userForm.controls['userSearch'];
  }

  get postSearch() {
    return this.postForm.controls['postSearch'];
  }

  getNextPostPage() {
    this.postPage++;
    this.postService.readPosts({
      page: this.postPage,
      searchText: this.postSearch.value,
    }).subscribe((response) => {
      this.posts = [...this.posts, ...response.posts];
      this.hasNextPostsPage = response.hasNextPage;
    }, (error: Error) => {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: error.message, type: 'ERROR'
      //   }
      // });
    })
  }

  getNextUserPage() {
    this.userPage++;
    this.userService.getUsers({
      page: this.userPage,
      text: this.userSearch.value
    }).subscribe((response) => {
      this.users = [...this.users, ...response.users];
      this.hasNextUsersPage = response.hasNextPage;
    }, (error: Error) => {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: error.message, type: 'ERROR'
      //   }
      // });
    })
  }
}
