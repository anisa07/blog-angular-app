import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Post} from '../../models/Post';

@Component({
  selector: 'posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  posts: Post[];
  @Input()
  tableColumns: string[] = [];

  cols: string[] = [];
  dataSource: MatTableDataSource<Post>;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tableColumns && changes.tableColumns.currentValue !== changes.tableColumns.previousValue) {
      this.cols = changes.tableColumns.currentValue
    }

    if(changes.posts && changes.posts.currentValue !== changes.posts.previousValue) {
      this.dataSource = new MatTableDataSource(changes.posts.currentValue);
    }
  }
}
