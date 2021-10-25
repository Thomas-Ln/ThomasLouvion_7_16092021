import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from './../comments.service';
import { Post } from '../post';
import { User } from '../user';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    // add the required "author_id" and "post_id"
    Object.assign(this.commentForm.value, {
      author_id: this.userId,
      post_id: this.postId
    });

    if (this.commentForm.valid) {
      this.commentsService.createOne(this.commentForm.value).subscribe();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['posts', this.postId])
      });
      // this.router.navigate([this.router.url]);
    }

  }

}
