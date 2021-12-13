import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { PostsService } from './../../services/posts.service';
import { User } from './../../types/user';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postType !: string | null;
  postForm !: FormGroup;
  userId: User["id"] = this.auth.getUserId();
  file?: File;

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postType = this.route.snapshot.paramMap.get('type');

    if (this.postType === 'text') {
      this.postForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        text: ['', [Validators.required]],
      });
    } else if (this.postType === 'image') {
      this.postForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        image: [null, [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    // add the required "user_id"
    Object.assign(this.postForm.value, {user_id: this.userId});

    if (this.postForm.valid) {
      if (this.postType === 'text') {
        this.postsService.createOne(this.postForm.value).subscribe();
      } else if (this.postType === 'image') {
        const post =  {
          user_id: this.userId,
          title: this.postForm.get('title')!.value,
        }
        this.postsService.createOneWithImage(post, this.file!).subscribe();
      }

      this.router.navigate([`posts/${this.postType}`]);
    }
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

}
