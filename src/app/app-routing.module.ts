import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "/post", pathMatch: "full"},
  { path: 'post', loadChildren: () => import('./post/post.module').then(module => module.PostModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(module => module.UserModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
