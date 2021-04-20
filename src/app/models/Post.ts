import {Label} from './Label';
import {CommentModel} from './CommentModel';

export interface Post {
    name: string;
    id?: string;
    author: string;
    authorId: string;
    labels: Label[];
    comments?: CommentModel[];
    showMoreComments?: boolean;
    likesValue: number;
    title: string;
    text: string;
    filename?: string;
}
