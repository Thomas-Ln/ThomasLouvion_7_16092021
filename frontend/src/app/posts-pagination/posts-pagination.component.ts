import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts-pagination',
  templateUrl: './posts-pagination.component.html',
  styleUrls: ['./posts-pagination.component.scss']
})
export class PostsPaginationComponent implements OnInit {
  @Input() page = 0;
  @Input() totalPages = 0;
  @Output() pageChange = new EventEmitter();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  /** @summary Update .btn-pagination routerlink number page when clicking on Prev/Next */
  reload(n: number) {
    if (this.page < 1 || isNaN(this.page)) this.page = 1;

    this.page = this.page + n;
    this.ngOnInit();
  }

  /** @summary Decide if Next button must be display in the view */
  isLastPage() {
    if (this.totalPages <= 0) return true;
    if (this.totalPages === this.page) return true;
    if (!Number.isInteger(this.totalPages) && Math.ceil(this.totalPages) === this.page) return true;

    return false;
  }

}
