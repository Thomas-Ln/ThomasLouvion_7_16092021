import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentsComponent } from './comments/comments.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { httpInterceptorProviders } from './interceptors/index';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsNavComponent } from './posts-nav/posts-nav.component';
import { PostsPaginationComponent } from './posts-pagination/posts-pagination.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
import { PaginationComponent } from './pagination/pagination.component';


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
