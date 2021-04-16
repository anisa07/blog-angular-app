import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Like } from 'src/app/models/Like';
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
  loginRequired: boolean;
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
    } else {
      this.loginRequired = true;
    }
  }

  likePost(l: number) {
    const like: Like = {
      value: l,
      userId: '',
      postId: this.post.id
    }
    let observable; 
    if (!this.currentUserLike) {
      observable = this.postService.setLike(like)
    } else {
      observable = this.postService.updateLike(like)
    }

    observable
    .pipe(
      switchMap(() => this.postService.readLikesForPost(this.post.id))
    )
    .subscribe((response) => {
      this.post = {...this.post, likesValue: response.value}
      this.currentUserLike = l;
    }, err => {
      this.currentUserLike = undefined;
    })
  }
}
