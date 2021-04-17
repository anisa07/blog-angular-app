import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from '../models/Like';
import { Post } from '../models/Post';
import { STORE_USER_KEY } from '../utils/constants';
import { LocalstoreService } from './localstore.service';
import { UrlService } from './url-service';
import {CommentModel} from '../models/CommentModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService) { }

  createHeaders() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ""}`,
      'id': userObject.id || ""
    })
  }

  createLabel(label: string) {
    return this.http.post(this.urlService.postTagUrl, {
      name: label
    }, {headers: this.createHeaders()});
  }

  createPost(formData: FormData) {
    const options = { headers: this.createHeaders()};
    return this.http.post<{id: string}>(this.urlService.postUrl, formData, options);
  }

  readPost(id: string) {
    return this.http.get<Post>(`${this.urlService.postUrl}/${id}`)
  }

  getImage(filename: string) {
    return `${this.urlService.postUrl}/image/${filename}`;
  }

  readLikesValue(postId: string) {
    return this.http.get<{value: number}>(`${this.urlService.likeUrl}/user/post/${postId}`, {headers: this.createHeaders()});
  }

  readLikesForPost(postId: string) {
    return this.http.get<{value: number}>(`${this.urlService.likeUrl}/post/${postId}`);
  }

  setLike(like: Like) {
    const options = { headers: this.createHeaders()};
    return this.http.post<Like>(this.urlService.likeUrl, like, options)
  }

  updateLike(like: Like) {
    const options = { headers: this.createHeaders()};
    return this.http.put<Like>(this.urlService.likeUrl, like, options)
  }

  createComment(comment: CommentModel) {
    const options = { headers: this.createHeaders()};
    return this.http.post<CommentModel>(this.urlService.commentUrl, comment, options)
  }

  readAllComments(postId: string, createAt?: number) {
    return this.http.get<{comments: CommentModel[]}>(`${this.urlService.commentUrl}/post/${postId}/?size=${5}`)
  }
}
