export interface CommentModel {
  id?: string;
  userId: string;
  username?:string;
  text: string;
  postId: string;
  createdAt?: number;
}
