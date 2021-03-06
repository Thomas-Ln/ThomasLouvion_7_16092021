import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CommentsService } from './../../services/comments.service';
import { Post } from './../../types/post';
import { User } from './../../types/user';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup;
  userId: User["id"] = this.auth.getUserId();
  postId: Post["id"] = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const postsType = this.route.snapshot.routeConfig?.path?.split('/')[0];

    // add the required "user_id" and "post_id"
    Object.assign(this.commentForm.value, {
      user_id: this.userId,
      post_id: this.postId
    });

    if (this.commentForm.valid) {
      this.commentsService.createOne(this.commentForm.value).subscribe();
      window.location.reload();
    }

  }

}
