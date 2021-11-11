import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors/index';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { PostsNavComponent } from './posts-nav/posts-nav.component';
// import { AdminComponent } from './admin/admin.component';
import { PostsPaginationComponent } from './posts-pagination/posts-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PostsListComponent,
    PostComponent,
    CommentsComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PostFormComponent,
    CommentFormComponent,
    PostsNavComponent,
    // AdminComponent,
    PostsPaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ httpInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
