import {Label} from './Label';

export interface Post {
    name: string;
    id?: string;
    authorId: string;
    labels: Label;
    comments?: any[];
    likesValue: number;
    title: string;
    text: string;
    filename?: string;
}