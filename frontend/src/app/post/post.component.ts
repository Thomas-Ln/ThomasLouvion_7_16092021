import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './../posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | undefined;

  constructor(private postsService: PostsService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.postsService.getOneById(id)
      .subscribe(post => this.post = post );
  }

}
