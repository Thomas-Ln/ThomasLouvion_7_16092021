import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  page: number = this.getActivePage();
  totalPages: number = 0;
  postsByPage:number = 12;
  commentsByPage:number = 24;

  constructor( private route: ActivatedRoute ) {}

  getActivePage() {
    return Number(this.route.snapshot.queryParamMap.get('page'));
  }

  isLastPage() {
    return (this.totalPages === this.page) ? true : false;
  }

  handleIsNaN() {
    if (isNaN(this.page)) this.page = 1;
  }

  handleUnderflow() {
    if (this.page < 1) this.page = 1;
  }

  handleOverflow(route: string) {
    if (this.totalPages > 0 && this.page > this.totalPages) {
      this.page = this.totalPages; // set to last page
      window.location.assign(`${route}?page=${this.totalPages}`);
    }
  }

}
