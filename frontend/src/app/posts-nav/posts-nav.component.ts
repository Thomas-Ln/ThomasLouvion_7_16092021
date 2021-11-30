import { PaginationService } from './../pagination.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-nav',
  templateUrl: './posts-nav.component.html',
  styleUrls: ['./posts-nav.component.scss']
})
export class PostsNavComponent implements OnInit {
  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {}

  goToFirstPage() {
    this.paginationService.page = 1;
  }
}
