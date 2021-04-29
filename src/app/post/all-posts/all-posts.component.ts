import { Component, OnInit } from '@angular/core';
import {AllPosts, PostService} from '../../services/post.service';
import {StoreService} from '../../services/store.service';
import {map, switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Error} from '../../models/Error';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {Post} from '../../models/Post';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Label} from '../../models/Label';
import {User} from '../../models/User';

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
  size: 10;

  constructor(private postService: PostService, private storeService: StoreService, private _snackBar: MatSnackBar) { }

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
  }

  getMorePosts() {
    this.getPosts(
      this.postService.readPosts({
        createdAt: this.posts[this.posts.length - 1].createdAt,
        size: this.size,
        labelIds: this.labels?.map(l => l.id),
        authorId: this.author?.id
      }), true
    );
  }

  getPosts(observable$: Observable<AllPosts>, addPosts?: boolean) {
    observable$.subscribe((response) => {
      this.posts = addPosts ? [...this.posts, ...response.posts] : response.posts;
      this.showMorePosts = response.showMorePosts;
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
