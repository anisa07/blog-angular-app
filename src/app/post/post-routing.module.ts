import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllPostsComponent} from './all-posts/all-posts.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostComponent} from './post/post.component';
import {OnlyLoggedInUsersGuard} from '../services/only-logged-in-users.guard';
import {PostResolver} from '../services/post.resolver';
import {ConfirmExitGuard} from '../services/confirm-exit.guard';

const routes: Routes = [
  {
    path: '', component: AllPostsComponent
  },
  {path: 'create', canActivate: [OnlyLoggedInUsersGuard], canDeactivate: [ConfirmExitGuard], component: CreatePostComponent},
  {
    path: ':id', component: PostComponent, resolve: {
      postData: PostResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OnlyLoggedInUsersGuard, ConfirmExitGuard]
})
export class PostRoutingModule {
}
