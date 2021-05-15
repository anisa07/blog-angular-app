import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyLoggedInUsersGuard } from '../services/only-logged-in-users.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SuperUserPageComponent } from './super-user-page/super-user-page.component';
import {NotLoggedInUsersGuard} from '../services/not-logged-in-users.guard';
import {UserResolver} from '../services/user.resolver';
import {SuperUsersGuard} from '../services/super-users.guard';
import {SuperResolver} from '../services/super.resolver';

const routes: Routes = [
    { path: 'profile', canActivate: [OnlyLoggedInUsersGuard], resolve: {
      userInfo: UserResolver
      }, component: ProfileComponent },
    { path: 'profile/:id', resolve: {userInfo: UserResolver}, component: ProfileComponent },
    { path: 'login', canActivate: [NotLoggedInUsersGuard], component: LoginComponent },
    { path: 'sign-up', canActivate: [NotLoggedInUsersGuard], component: SignupComponent },
    { path: 'forgot-password', canActivate: [NotLoggedInUsersGuard], component: ForgotPasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'super', canActivate: [OnlyLoggedInUsersGuard, SuperUsersGuard], resolve: {
      superData: SuperResolver
      }, component: SuperUserPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NotLoggedInUsersGuard, OnlyLoggedInUsersGuard, SuperUsersGuard, UserResolver, SuperResolver]
})
export class UserRoutingModule { }
