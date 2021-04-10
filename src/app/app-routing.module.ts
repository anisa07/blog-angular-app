import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SuperUserPageComponent } from './pages/super-user-page/super-user-page.component';

const routes: Routes = [
  { path: '', component: AllPostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'post-create', component: CreatePostComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'super', component: SuperUserPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
