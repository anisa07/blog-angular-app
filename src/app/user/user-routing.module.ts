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

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'login', canActivate: [NotLoggedInUsersGuard], component: LoginComponent },
    { path: 'sign-up', canActivate: [NotLoggedInUsersGuard], component: SignupComponent },
    { path: 'forgot-password', canActivate: [NotLoggedInUsersGuard], component: ForgotPasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'super', component: SuperUserPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NotLoggedInUsersGuard]
})
export class UserRoutingModule { }
