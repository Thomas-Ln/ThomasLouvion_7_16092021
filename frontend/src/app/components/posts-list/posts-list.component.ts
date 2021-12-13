import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from './../../services/pagination.service';
import { PostsService } from './../../services/posts.service';
import { PaginationType } from './../../types/pagination-type';
import { Post } from './../../types/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  postsType: string = this.route.snapshot.url.join('');
  paginationType: PaginationType = 'prevNext';
  contentHasLoaded: boolean = false;

  constructor(
    private postsService: PostsService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.paginationService.handleIsNaN();
    this.paginationService.handleUnderflow();

    this.getPosts(this.paginationService.page);
  }

  getPosts(page: number): void {
    if (this.postsType != undefined ) {
      this.postsService.getAllByType(this.postsType, page)
      .subscribe(posts => {
        this.posts = posts.rows;
        this.paginationService.totalPages = Math.ceil(posts.count / this.paginationService.postsByPage);
        this.paginationService.handleOverflow(`/posts/${this.postsType}`);
        this.contentHasLoaded = true;
      })
    }
  }

}
