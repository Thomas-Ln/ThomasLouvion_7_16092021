import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ProfileGuard } from './profile.guard';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', children: [
      {path: '', component: AdminComponent },
      {path: ':type/:id', component: AdminCommentsComponent },
    ],
    canActivate: [AdminGuard]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'posts',
    children: [
      { path: '', redirectTo: 'text', pathMatch: 'full' },
      { path: 'text', component: PostsListComponent },
      { path: 'image', component: PostsListComponent },
      { path: ':type/create', component: PostFormComponent },
      { path: 'update/:id', component: PostFormComponent },
      { path: 'text/:id', component: PostComponent },
      { path: 'image/:id', component: PostComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent } // must be the last route (see https://angular.io/guide/router#setting-up-wildcard-routes)
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  providers: [AdminGuard, ProfileGuard, AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
