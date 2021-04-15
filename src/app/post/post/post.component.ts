import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post = null;
  currentUserLike: number;
  postData = []
  image: string = "";

  constructor(private route: ActivatedRoute, private postService: PostService) {
    
  }

  ngOnInit(): void {
    this.postData = this.route.snapshot.data["postData"];
    if (!(this.postData[0] instanceof HttpErrorResponse)) {
      this.post = this.postData[0];
      if (this.post.filename) {
        this.image = this.postService.getImage(this.post.filename)
      }
    }
    if (!(this.postData[1] instanceof HttpErrorResponse)) {
      this.currentUserLike = this.postData[1].value;
    }
  }

}
