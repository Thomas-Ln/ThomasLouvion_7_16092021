import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminGuard } from './guards/admin.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AuthService } from './services/auth.service';

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
