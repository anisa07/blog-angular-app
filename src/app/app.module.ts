import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CreatePostStep1Component } from './pages/create-post/create-post-step1/create-post-step1.component';
import { CreatePostStep2Component } from './pages/create-post/create-post-step2/create-post-step2.component';
import { CreatePostStep3Component } from './pages/create-post/create-post-step3/create-post-step3.component';
import { CreatePostStep4Component } from './pages/create-post/create-post-step4/create-post-step4.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SuperUserPageComponent } from './pages/super-user-page/super-user-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CustomBaseComponent } from './components/custom-base/custom-base.component';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HttpErrorComponent,
    CreatePostComponent,
    UserProfileComponent,
    CreatePostStep1Component,
    CreatePostStep2Component,
    CreatePostStep3Component,
    CreatePostStep4Component,
    FileUploadComponent,
    AllPostsComponent,
    PostComponent,
    ProfileComponent,
    SuperUserPageComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    NotFoundComponent,
    CustomBaseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
