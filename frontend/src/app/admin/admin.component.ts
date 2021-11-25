import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts: any[] = [];
  page: number = this.getCurrentPage();
  totalPages: number = Number();
  postsByPage:number = 12; // must be equal to POST_LIMIT in backend/controllers/posts

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.page < 1 || isNaN(this.page)) this.page = 1
    this.getPosts(this.page);
  }

  getPosts(page: number) {
    this.postsService.getAll(page)
      .subscribe(posts => {
        this.posts = posts.rows;
        this.totalPages = posts.count / this.postsByPage;
        this.handlePageOverflow();
      });
  }

  /** @summary If page > totalPages return to totalPages */
  handlePageOverflow() {
    if(this.totalPages > 0 && this.page > Math.ceil(this.totalPages)) {
      this.router.navigateByUrl(`/admin?page=${Math.ceil(this.totalPages)}`);
      this.page = Math.ceil(this.totalPages); // reset page to totalPages
      this.ngOnInit(); // reload component ( will call getPosts(totalPages) )
    }
  }

  getCurrentPage() {
    return Number(this.route.snapshot.queryParamMap.get('page'));
  }

  onCheck(value: boolean, type: 'posts' | 'comments', id: number) {
    this.authService.moderate(value, type, id).subscribe(() =>{
      this.page = this.getCurrentPage();
      this.ngOnInit()
    });
  }

}
