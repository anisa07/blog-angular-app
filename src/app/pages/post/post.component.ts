import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

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
    this.route.params.pipe(
      mergeMap(
        params => forkJoin(
          [this.postService.readPost(params.id),
            this.postService.readLikesValue(params.id)]
        ),
      )
    ).subscribe((data) => {
      console.log(data)
      this.post = data[0];
      if (this.post.filename) {
        this.image = this.postService.getImage(this.post.filename)
      }
      this.currentUserLike = data[1].value;
    });
  }

}
