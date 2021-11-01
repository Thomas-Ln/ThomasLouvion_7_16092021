import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from './../posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    const postsType = this.route.snapshot.routeConfig?.path;
    if (postsType != undefined) {
        this.postsService.getAllByType(postsType)
        .subscribe(posts => this.posts = posts)
    } else {
      console.error('Error: PostType undefined !');
    }
  }
}
