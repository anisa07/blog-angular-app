import { Component, OnInit } from '@angular/core';
import {AllPosts, PostService} from '../../services/post.service';
import {StoreService} from '../../services/store.service';
import {debounce, distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import {Observable, of, timer} from 'rxjs';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {Post} from '../../models/Post';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Label} from '../../models/Label';
import {User} from '../../models/User';
import {FormBuilder, FormGroup} from '@angular/forms';
import {emptyValueValidator} from '../../utils/validators/empty-value-validator';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  showMorePosts: boolean = false;
  postData: AllPosts;
  posts: Post[];
  labels: Label[];
  author: User;
  size = 10;
  currentPage = 1;
  form: FormGroup;

  constructor(private postService: PostService, private storeService: StoreService, private _snackBar: MatSnackBar, private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
      sortBy: ['']
    })
  }

  get search() {
    return this.form.controls['search'];
  }

  get sortBy() {
    return this.form.controls['sortBy'];
  }

  onChanges(): void {
    this.currentPage = 1;
    this.getPosts(
      this.form.valueChanges.pipe(
        distinctUntilChanged(),
        debounce(() => timer(1000)),
        switchMap(v => {
            console.log(v)
            return this.postService.readPosts({
              updatedAt: undefined,
              size: this.size,
              labelIds: this.labels?.map(l => l.id),
              authorId: this.author?.id,
              searchText: v.search,
              sortBy: v.sortBy,
              page: this.currentPage
            })
          }
        )
      )
    )
  }

  ngOnInit(): void {
    this.getPosts(
      this.storeService.posts$.pipe(
        take(1),
        switchMap(data => {
          if (data.posts.length > 0) {
            return of(data)
          } else {
            return this.postService.readPosts()
          }
        })
      )
    )

    this.onChanges();
  }

  getMorePosts() {
    this.currentPage++;
    this.getPosts(
      this.postService.readPosts({
        updatedAt: this.posts[this.posts.length - 1].updatedAt,
        size: this.size,
        labelIds: this.labels?.map(l => l.id),
        authorId: this.author?.id,
        searchText: this.search?.value || '',
        sortBy: this.sortBy?.value || '',
        page: this.currentPage
      }), true
    );
  }

  getPosts(observable$: Observable<AllPosts>, addPosts?: boolean) {
    observable$.subscribe((response) => {
      this.posts = addPosts ? [...this.posts, ...response.posts] : response.posts;
      this.showMorePosts = response.hasNextPage;
      this.storeService.setPosts(response);
      console.log(response)
    }, (error: Error) => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: error.message, type: 'ERROR'
        }
      });
    });
  }
}
