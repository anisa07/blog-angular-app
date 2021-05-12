import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SuperUserPageComponent } from './super-user-page/super-user-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import {PostModule} from '../post/post.module';

@NgModule({
  declarations: [
    ProfileComponent,
    SuperUserPageComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        UserRoutingModule,
        PostModule
    ]
})
export class UserModule { }
