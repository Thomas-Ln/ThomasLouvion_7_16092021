import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.page < 1 || isNaN(this.page)) this.page = 1;
    this.getPosts(this.page);
  }

  getPosts(page: number): void {
    if (this.postsType != undefined) {
        this.postsService.getAllByType(this.postsType, page)
        .subscribe(posts => this.posts = posts)
    } else {
      console.error('Error: PostType undefined !');
    }
  }
}
