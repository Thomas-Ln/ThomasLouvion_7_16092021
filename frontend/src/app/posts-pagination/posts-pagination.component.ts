import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts-pagination',
  templateUrl: './posts-pagination.component.html',
  styleUrls: ['./posts-pagination.component.scss']
})
export class PostsPaginationComponent implements OnInit {
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

}
