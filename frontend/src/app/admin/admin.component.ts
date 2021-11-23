import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getAll()
      .subscribe(posts => this.posts = posts);
  }

  onCheck(value: boolean, type: 'posts' | 'comments', id: number) {
    this.authService.moderate(value, type, id).subscribe(() => this.ngOnInit());
  }

}
