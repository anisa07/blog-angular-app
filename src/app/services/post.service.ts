import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from '../models/Like';
import { Post } from '../models/Post';
import { LocalstoreService } from './localstore.service';
import { UrlService } from './url-service';
import {CommentModel} from '../models/CommentModel';

interface PostsQuery {
  updatedAt?: number,
  size?: number,
  labelIds?: string[],
  authorId?: string,
  sortBy?: string,
  sortDir?: string;
  searchText?: string,
  page?: number,
  searchBy?:string
}

interface CommentsQuery {
  updatedAt?: number,
  size?: number,
  page?: number,
  postId: string
}

export interface AllPosts {
  posts: Post[],
  hasNextPage: boolean,
  totalDocs: number
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private urlService: UrlService, private storageService: LocalstoreService) { }

  createLabel(label: string) {
    return this.http.post(this.urlService.postTagUrl, {
      name: label
    });
  }

  createPost(formData: FormData) {
    return this.http.post<{id: string}>(this.urlService.postUrl, formData);
  }

  updatePost(formData: FormData) {
    return this.http.put<{id: string}>(`${this.urlService.postUrl}/${formData.get('id')}`, formData);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.urlService.postUrl}/${id}`)
  }

  readPost(id: string) {
    return this.http.get<Post>(`${this.urlService.postUrl}/${id}`)
  }

  readPosts(query?: PostsQuery) {
    let url = `${this.urlService.postUrl}`;
    if (query) {
      url = `${url}/?sortBy=${query.sortBy || ''}&sortDir=${query.sortDir || ''}&searchBy=${query.searchBy || ''}&searchText=${query.searchText || ''}&page=${query.page || 1}&size=${query.size || 10}&labelIds=${query.labelIds || ''}&authorId=${query.authorId || ''}`
    }

    return this.http.get<AllPosts>(url)
  }

  getImage(filename: string) {
    return `${this.urlService.postUrl}/image/${filename}`;
  }

  readLikesValue(postId: string) {
    return this.http.get<{value: number}>(`${this.urlService.likeUrl}/user/post/${postId}`);
  }

  readLikesForPost(postId: string) {
    return this.http.get<{value: number}>(`${this.urlService.likeUrl}/post/${postId}`);
  }

  setLike(like: Like) {
    return this.http.post<Like>(this.urlService.likeUrl, like)
  }

  updateLike(like: Like) {
    return this.http.put<Like>(this.urlService.likeUrl, like)
  }

  createComment(comment: CommentModel) {
    return this.http.post<CommentModel>(this.urlService.commentUrl, comment)
  }

  readAllComments(query: CommentsQuery) {
    let url = `${this.urlService.commentUrl}/post/${query.postId}`;
    if (query) {
      url = `${url}/?updatedAt=${query.updatedAt|| ''}&size=${query.size || 10}&page=${query.page || 1}`;
    }
    return this.http.get<{comments: CommentModel[], showMoreComments: boolean}>(url)
  }

  editComment(comment: CommentModel) {
    let url = `${this.urlService.commentUrl}/${comment.id}`;
    return this.http.put<CommentModel>(url, comment);
  }

  deleteComment(id: String) {
    return this.http.delete<string>(`${this.urlService.commentUrl}/${id}`);
  }
}
