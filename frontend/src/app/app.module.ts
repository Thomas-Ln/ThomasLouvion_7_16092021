import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminComponent } from './components/admin/admin.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsNavComponent } from './components/posts-nav/posts-nav.component';
import { PostsPaginationComponent } from './components/posts-pagination/posts-pagination.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { httpInterceptorProviders } from './interceptors/index';


@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    CommentFormComponent,
    CommentsComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
    PostComponent,
    PostFormComponent,
    PostsListComponent,
    PostsNavComponent,
    PostsPaginationComponent,
    ProfileComponent,
    SignupComponent,
    AdminCommentsComponent,
    PaginationComponent,
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
