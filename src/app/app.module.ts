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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreatePostStep1Component } from './create-post/create-post-step1/create-post-step1.component';
import { CreatePostStep2Component } from './create-post/create-post-step2/create-post-step2.component';
import { CreatePostStep3Component } from './create-post/create-post-step3/create-post-step3.component';
import { CreatePostStep4Component } from './create-post/create-post-step4/create-post-step4.component';

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
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
