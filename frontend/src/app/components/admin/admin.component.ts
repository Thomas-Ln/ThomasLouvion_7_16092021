import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { PaginationService } from './../../services/pagination.service';
import { PostsService } from './../../services/posts.service';
import { PaginationType } from './../../types/pagination-type';
import { Post } from './../../types/post';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts: Post[] = [];
  paginationType: PaginationType = 'prevNext';
  contentHasLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private paginationService: PaginationService,
  ) { }

  ngOnInit(): void {
    this.paginationService.handleIsNaN();
    this.paginationService.handleUnderflow();

    this.getPosts(this.paginationService.page);
  }

  getPosts(page: number) {
    this.postsService.getAll(page)
    .subscribe(posts => {
      this.posts = posts.rows;
      this.paginationService.totalPages = Math.ceil(posts.count / this.paginationService.postsByPage);
      this.paginationService.handleOverflow('/admin');
      this.contentHasLoaded = true;
    });
  }

  onCheck(value: boolean, type: 'posts' | 'comments', id: number) {
    this.authService.moderate(value, type, id).subscribe(() =>{
      this.ngOnInit()
    });
  }

}
