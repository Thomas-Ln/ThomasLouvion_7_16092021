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
  posts: Post[] = [];
  postsType: string = this.route.snapshot.url.join('');
  page: number = Number(this.route.snapshot.queryParamMap.get('page'));
  totalPages: number = Number();
  postsByPage:number = 12; // must be equal to POST_LIMIT in backend/controllers/posts

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.page < 1 || isNaN(this.page)) this.page = 1;
    this.getPosts(this.page);
  }

  /** @summary Fetch Posts */
  getPosts(page: number): void {
    if (this.postsType != undefined ) {
      this.postsService.getAllByType(this.postsType, page)
      .subscribe(posts => {
        this.posts = posts.rows;
        this.totalPages = posts.count / this.postsByPage;
        this.handlePageOverflow();
      })
    }
  }

  /** @summary If page > totalPages return to totalPages */
  handlePageOverflow() {
    if(this.totalPages > 0 && this.page > Math.ceil(this.totalPages)) {
      this.router.navigateByUrl(`/posts/${this.postsType}?page=${Math.ceil(this.totalPages)}`);
      this.page = Math.ceil(this.totalPages); // reset page to totalPages
      this.ngOnInit(); // reload component ( will call getPosts(totalPages) )
    }
  }

}
