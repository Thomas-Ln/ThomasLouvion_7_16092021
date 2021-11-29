import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pagination } from '../pagination';
import { PaginationService } from './../pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, Pagination {
  @Output() pageChange = new EventEmitter();

  page: number = 0;
  isLastPage: boolean = false;

  constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.page = this.paginationService.page;
    this.isLastPage = this.paginationService.isLastPage();
  }

  updatePage(n: number) {
    this.paginationService.page = this.page + n;
    this.ngOnInit();
  }

}
