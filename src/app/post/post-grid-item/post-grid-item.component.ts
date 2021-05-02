import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'post-grid-item',
  templateUrl: './post-grid-item.component.html',
  styleUrls: ['./post-grid-item.component.scss']
})
export class PostGridItemComponent implements OnInit {
  @Input()
  post: Post;
  image: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    if (this.post.filename) {
      this.image = this.postService.getImage(this.post.filename);
    }
  }

}
