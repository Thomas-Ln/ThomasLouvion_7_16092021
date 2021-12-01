import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../comment';
import { CommentsService } from './../comments.service';
import { PaginationType } from './../pagination-type';
import { PaginationService } from './../pagination.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() postId: number = 0;
  comments: Comment[] = [];
  paginationType: PaginationType = 'loadMore';
  contentHasLoaded: boolean = false;

  constructor(
    private commentsService: CommentsService,
    private paginationService: PaginationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paginationService.handleIsNaN();
    this.paginationService.handleUnderflow();

    this.getCommentsOfPost(this.paginationService.page);
  }

  getCommentsOfPost(page: number) {
    this.commentsService.getAllByPostId(this.postId, page).subscribe((comments) => {
      this.comments = this.comments.concat(comments.rows);
      this.paginationService.totalPages = Math.ceil(comments.count / this.paginationService.commentsByPage);
      this.paginationService.handleOverflow(this.router.url);
      this.contentHasLoaded = true;
    })
  }
}
