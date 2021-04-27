import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Post } from '../models/Post';
import { PostService } from './post.service';

@Injectable()
export class PostResolver implements Resolve<[Post, number]> {
    constructor(private postService: PostService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Post, number]> {
        const readPost = (id: string) => this.postService.readPost(id).pipe(
            take(1),
            catchError((e) => of(e))
        )

        const readLikesValue = (id: string) => this.postService.readLikesValue(id).pipe(
            take(1),
            catchError((e) => of(e))
        )

        const id = route.paramMap.get("id")

        return forkJoin([readPost(id), readLikesValue(id)])
    }
}
