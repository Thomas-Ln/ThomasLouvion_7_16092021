import { PaginationService } from './../pagination.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  contentHasLoaded: boolean = false;
  posts: Post[] = [];
  postsType: string = this.route.snapshot.url.join('');

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
        this.paginationService.handleOverflow(`posts/${this.postsType}`);
        this.contentHasLoaded = true;
      })
    }
  }

}
