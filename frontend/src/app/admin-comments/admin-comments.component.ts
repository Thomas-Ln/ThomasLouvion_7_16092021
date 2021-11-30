import { PaginationService } from './../pagination.service';
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
 contentHasLoaded: boolean = false;
 postId: Post["id"] = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
 postUrl: string = this.router.url.replace('admin', 'posts');

  constructor(
    private authService: AuthService,
    private commentsService: CommentsService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paginationService.handleIsNaN();
    this.paginationService.handleUnderflow();

    this.getComments(this.paginationService.page);
  }

  getComments(page: number) {
    this.commentsService.getAllByPostForAdmin(this.postId, page)
    .subscribe(comments => {
      if (comments.length === 0) this.router.navigateByUrl('/admin');

      this.comments = comments.rows;
      this.paginationService.totalPages = Math.ceil(comments.count / this.paginationService.commentsByPage);
      this.paginationService.handleOverflow(this.router.url);
      this.contentHasLoaded = true;
    });
  }

  onCheck(value: boolean, type: 'posts' | 'comments', id: number) {
    this.authService.moderate(value, type, id).subscribe(() => this.ngOnInit());
  }

}
