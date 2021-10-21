import { Router } from '@angular/router';
import { User } from './../user';
import { PostsService } from './../posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm !: FormGroup
  userId: User["id"] = this.auth.getUserId();

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });

  }

  onSubmit(): void {
    // add the required "author_id"
    Object.assign(this.postForm.value, {author_id: this.userId});

    if (this.postForm.valid) {
      this.postsService.createOne(this.postForm.value).subscribe();
    }
    this.router.navigate(['posts']);
  }

  /*
    onSubmit(): void {
    if (this.signupForm.valid) {
      this.usersService.signup(this.signupForm.value).subscribe();
    }
  }
  */

}
