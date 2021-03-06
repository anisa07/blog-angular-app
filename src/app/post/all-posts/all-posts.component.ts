import {Component, OnInit} from '@angular/core';
import {AllPosts, PostService} from '../../services/post.service';
import {debounce, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Error} from '../../models/Error';
import {Post} from '../../models/Post';
import {Label} from '../../models/Label';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {LocalstoreService} from '../../services/localstore.service';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  dataSource: MatTableDataSource<Post>;
  showMorePosts: boolean = false;
  postData: AllPosts;
  posts: Post[] = [];
  labels: Label[] = [];
  author: User;
  size = 10;
  length = 0;
  currentPage = 1;
  form: FormGroup;
  rowHeight: string = '2:2';
  loading: boolean = false;
  columnsList: string[] = ['Author', 'Title', 'Updated Date', 'Comments Count', 'Likes Value', 'Edit/Delete'];
  tableColumns = new FormControl(this.columnsList);
  cols = new FormControl('4');
  storagePostView: string = "";

  constructor(
    private postService: PostService,
    private userService: UserService,
    private localstroreService: LocalstoreService,
    private fb: FormBuilder
  ) {
  }

  get search() {
    return this.form.controls['search'];
  }

  get sortBy() {
    return this.form.controls['sortBy'];
  }

  get view() {
    return this.form.controls['view'];
  }

  onChanges(): void {
    this.loading = true;
    this.getPosts(
      this.form.valueChanges.pipe(
        distinctUntilChanged(),
        debounce(() => timer(700)),
        switchMap(v => {
            this.currentPage = 1;
            const newView = this.view.value;
            if (this.storagePostView !== newView) {
              this.localstroreService.setPostsView(newView)
            }
            return this.postService.readPosts({
              size: this.size,
              labelIds: this.labels?.map(l => l.id),
              authorId: this.author?.id,
              searchText: v.search,
              sortBy: v.sortBy,
              page: this.currentPage,
            });
          }
        )
      )
    );
  }

  ngOnInit(): void {
    this.storagePostView = this.localstroreService.getPostsView();
    this.form = this.fb.group({
      search: [''],
      sortBy: [''],
      searchBy: ['title'],
      view: [this.storagePostView || 'list'],
    });

    this.loading = true;
    this.getPosts(
      this.postService.readPosts()
    );

    this.onChanges();
  }

  sortTable(sort: {sortBy: string, sortDir: string}) {
    this.currentPage = 1;
    this.getPosts(
      this.postService.readPosts({
        size: this.size,
        labelIds: this.labels?.map(l => l.id),
        authorId: this.author?.id,
        searchText: this.search?.value || '',
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
        page: this.currentPage
      })
    )
  }

  deletePost(id: string) {
    this.getPosts(
      this.postService.deletePost(id).pipe(
        switchMap(() => this.postService.readPosts({
          size: this.size,
          labelIds: this.labels?.map(l => l.id),
          authorId: this.author?.id,
          searchText: this.search?.value || '',
          page: this.currentPage,
        }))
      )
    )
  }

  paginateTable(page: {pageSize: number, page: number}) {
    this.size = page.pageSize;
    this.currentPage = page.page;
    this.getPosts(
      this.postService.readPosts({
        size: this.size,
        labelIds: this.labels?.map(l => l.id),
        authorId: this.author?.id,
        searchText: this.search?.value || '',
        page: this.currentPage,
      })
    )
  }

  getMorePosts() {
    this.loading = true;
    this.currentPage++;
    this.getPosts(
      this.postService.readPosts({
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
      const userId = this.userService.getUserId();
      this.posts = addPosts ? [...this.posts, ...response.posts] : response.posts;
      this.posts = (this.posts || []).map(p => {
        p.canUpdate = p.authorId === userId;
        return p;
      })
      this.dataSource = new MatTableDataSource(this.posts);
      this.showMorePosts = response.hasNextPage;
      this.loading = false;
      this.length = response.totalDocs;
    });
  }
}
