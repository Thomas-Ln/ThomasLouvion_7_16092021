import { Component, OnInit } from '@angular/core';
import { PaginationType } from '../pagination-type';
import { AuthService } from './../auth.service';
import { PaginationService } from './../pagination.service';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts: any[] = [];
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
