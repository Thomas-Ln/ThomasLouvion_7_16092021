import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { CommentsService } from './../comments.service';
import { Post } from './../post';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {
 comments: any[] = [];
 postId: Post["id"] = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
 postUrl: string = this.router.url.replace('admin', 'posts');

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentsService.getAllByPostForAdmin(this.postId)
    .subscribe(comments => {
      if (comments.length === 0) {
        this.router.navigateByUrl('/admin');
      }

      this.comments = comments;
    });
  }

  onCheck(value: boolean, type: 'posts' | 'comments', id: number) {
    this.authService.moderate(value, type, id).subscribe(() => this.ngOnInit());
  }

}
