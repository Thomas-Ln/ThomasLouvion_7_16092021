import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from './../../services/pagination.service';
import { Pagination } from './../../types/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, Pagination {
  @Input() paginationType: string = '';
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
