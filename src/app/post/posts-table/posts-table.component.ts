import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Post} from '../../models/Post';
import {Observable, of} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {Router} from '@angular/router';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  length: number;
  @Input()
  posts: Post[];
  @Input()
  tableColumns: string[] = [];
  @Output()
  sortTable = new EventEmitter<{ sortBy: string, sortDir: string }>();
  @Output()
  confirmDeletePost = new EventEmitter<string>();
  @Output()
  paginateTable = new EventEmitter<{ pageSize: number, page: number }>();
  cols: string[] = [];
  dataSource: MatTableDataSource<Post>;
  isLoggedOut$:  Observable<boolean>;
  pageSize = 10;

  constructor(private storeService: StoreService, private router: Router, public dialog: MatDialog) {
    this.isLoggedOut$ = this.storeService.isLoggedOut$;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tableColumns && changes.tableColumns.currentValue !== changes.tableColumns.previousValue) {
      this.cols = changes.tableColumns.currentValue
    }

    if(changes.posts && changes.posts.currentValue !== changes.posts.previousValue) {
      this.dataSource = new MatTableDataSource(changes.posts.currentValue);
    }
  }

  paginate(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.paginateTable.emit({pageSize: this.pageSize, page: e.pageIndex + 1});
    // console.log(e)
    // {previousPageIndex: 1, pageIndex: 0, pageSize: 10, length: 10}
  }

  changeSort(e: Sort) {
    let field = '';
    if (e.active === "Author") {
      field = 'author';
    }
    if (e.active === "Title") {
      field = 'title';
    }
    if (e.active === "Updated Date") {
      field = 'updatedAt'
    }
    this.sortTable.emit({sortBy: field, sortDir: e.direction || "asc"});
  }

  convertDate(d: string) {
    const date = new Date(d);
    return date.toLocaleDateString()
  }

  editPost(p: Post) {
    this.router.navigate(['post', 'update', p.id]);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        text: 'Are you sure you want to delete this post completely?',
      }
    });

    return dialogRef.afterClosed();
  }

  deletePost(p: Post) {
    this.confirmDelete().subscribe(response => {
      if(response) {
        this.confirmDeletePost.emit(p.id)
      }
    })
  }
}
