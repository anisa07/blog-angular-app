import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/Post';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input()
  post: Post;

  constructor() { }

  ngOnInit(): void {

  }

  readPost(id: string) {

  }
}
