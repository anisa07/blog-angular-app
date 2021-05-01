import {Label} from './Label';
import {CommentModel} from './CommentModel';

export interface Post {
    id?: string;
    author: string;
    authorId: string;
    labels: Label[];
    commentsCount?: number;
    comments?: CommentModel[];
    showMoreComments?: boolean;
    likesValue: number;
    title: string;
    text: string;
    filename?: string;
    createdAt?: number;
    updatedAt?: number;
}
