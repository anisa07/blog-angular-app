import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  image: string = "";

  constructor(private route: ActivatedRoute, private postService: PostService) {
    
  }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap(
        params => this.postService.readPost(params.id)
      ),
    ).subscribe((post) => {
      console.log(post)
      this.post = post;
      if (post.filename) {
        this.image = this.postService.getImage(post.filename)
      }
    });
  }

}
