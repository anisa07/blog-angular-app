import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { OverlayModule } from '@angular/cdk/overlay';
import {HttpConfigInterceptor} from './services/httpconfig.interceptor';
// import {SnackbarComponent} from './snackbar/snackbar.component';
// import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    // SnackbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PostModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OverlayModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
  ]
})
export class AppModule { }
