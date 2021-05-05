import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Post} from '../../models/Post';
import {Observable} from 'rxjs';
import {StoreService} from '../../services/store.service';

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
  paginateTable = new EventEmitter<{ pageSize: number, page: number }>();
  cols: string[] = [];
  dataSource: MatTableDataSource<Post>;
  isLoggedIn$:  Observable<boolean>;
  pageSize = 10;

  constructor(private storeService: StoreService) {
    this.isLoggedIn$ = this.storeService.isLoggedIn$;
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
    console.log(e)
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

}
