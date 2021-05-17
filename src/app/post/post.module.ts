import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from './create-post/create-post.component';
import {CreatePostStep1Component} from './create-post/create-post-step1/create-post-step1.component';
import {CreatePostStep2Component} from './create-post/create-post-step2/create-post-step2.component';
import {CreatePostStep3Component} from './create-post/create-post-step3/create-post-step3.component';
import {CreatePostStep4Component} from './create-post/create-post-step4/create-post-step4.component';
import {AllPostsComponent} from './all-posts/all-posts.component';
import {PostComponent} from './post/post.component';
import {MaterialModule} from '../material/material.module';
import {ComponentsModule} from '../components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostRoutingModule} from './post-routing.module';
import {CreateCommentComponent} from './create-comment/create-comment.component';
import {CommentsComponent} from './comments/comments.component';
import {PostListItemComponent} from './post-list-item/post-list-item.component';
import {PostGridItemComponent} from './post-grid-item/post-grid-item.component';
import {PostsTableComponent} from './posts-table/posts-table.component';
import {UpdatePostComponent} from './update-post/update-post.component';
import { DefaultImagePipe } from '../utils/pipes/default-image.pipe';

@NgModule({
    declarations: [
        CreatePostComponent,
        CreatePostStep1Component,
        CreatePostStep2Component,
        CreatePostStep3Component,
        CreatePostStep4Component,
        AllPostsComponent,
        PostComponent,
        CreateCommentComponent,
        CommentsComponent,
        PostListItemComponent,
        PostGridItemComponent,
        PostsTableComponent,
        UpdatePostComponent,
        DefaultImagePipe,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ComponentsModule,
        ReactiveFormsModule,
        PostRoutingModule,
        FormsModule,
    ],
    exports: [
        PostListItemComponent
    ]
})
export class PostModule {
}
