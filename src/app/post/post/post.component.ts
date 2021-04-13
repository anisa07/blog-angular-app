import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
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
  image: string = "";

  constructor(private route: ActivatedRoute, private postService: PostService) {
    
  }

  ngOnInit(): void {
    const readPost = (id: string) => this.postService.readPost(id).pipe(
      take(1),
      catchError((e) => of(e))
    )

    const readLikesValue = (id: string) => this.postService.readLikesValue(id).pipe(
      take(1),
      catchError((e) => of(e))
    )

    this.route.params.pipe(
      mergeMap(
        params => forkJoin([readPost(params.id), readLikesValue(params.id)])
      )
    )
    .subscribe((data) => {
      console.log(data)
      if (!(data[0] instanceof HttpErrorResponse)) {
        this.post = data[0];
        if (this.post.filename) {
          this.image = this.postService.getImage(this.post.filename)
        }
      }
      if (!(data[1] instanceof HttpErrorResponse)) {
        this.currentUserLike = data[1].value;
      }
    });
  }

}
