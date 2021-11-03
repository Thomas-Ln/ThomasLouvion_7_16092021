import { PostFormComponent } from './post-form/post-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts',
    children: [
      { path: '', redirectTo: 'text', pathMatch: 'full' },
      { path: 'text', component: PostsListComponent },
      { path: 'image', component: PostsListComponent },
      { path: ':type/create', component: PostFormComponent },
      { path: 'update/:id', component: PostFormComponent },
      { path: 'text/:id', component: PostComponent},
      { path: 'image/:id', component: PostComponent},
    ]
  },
  { path: '**', component: PageNotFoundComponent } // must be the last route (see https://angular.io/guide/router#setting-up-wildcard-routes)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
