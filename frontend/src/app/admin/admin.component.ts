import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { PaginationService } from './../pagination.service';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  contentHasLoaded: boolean = false;
  posts: any[] = [];

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
      this.paginationService.handleOverflow();
      this.contentHasLoaded = true;
    });
  }

  onCheck(value: boolean, type: 'posts' | 'comments', id: number) {
    this.authService.moderate(value, type, id).subscribe(() =>{
      this.paginationService.page = this.paginationService.getActivePage();
      this.ngOnInit()
    });
  }

}
