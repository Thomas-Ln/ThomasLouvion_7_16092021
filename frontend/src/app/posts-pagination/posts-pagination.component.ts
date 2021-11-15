import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts-pagination',
  templateUrl: './posts-pagination.component.html',
  styleUrls: ['./posts-pagination.component.scss']
})
export class PostsPaginationComponent implements OnInit {
  @Input() totalPosts = 0;
  @Output() pageChange = new EventEmitter();

  page: number = Number(this.route.snapshot.queryParamMap.get('page'));;

  constructor(private route: ActivatedRoute) {
    if (this.page < 1 || isNaN(this.page)) this.page = 1;
  }

  ngOnInit(): void {}

  reload(n: number) {
    if (this.page < 1 || isNaN(this.page)) this.page = 1;

    this.page = this.page + n;
    this.ngOnInit();
  }

  /** @summary Used by the view to decide if Next button must be display */
  isLastPage() {
    /**
     * @see backend/controllers/posts.js PAGE_LIMIT - the two value must be equal
     * @todo find a better architecture for this
     */
    const limitOfPostsByPage = 12;

    const totalPages = this.totalPosts / limitOfPostsByPage;

    if (totalPages === this.page) return true;
    if (!Number.isInteger(totalPages) && Math.ceil(totalPages) === this.page) return true;

    return false;
  }

}
