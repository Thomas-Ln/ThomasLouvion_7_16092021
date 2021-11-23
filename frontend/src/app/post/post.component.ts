import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  postId: Post["id"] = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.getPost();
  }

  /** Use route :id to fetch post. */
  getPost(): void {
    // Fetch user role to let admin access to moderated posts
    this.authService.getUserRole().subscribe(role => {
      const isAdmin: boolean = Boolean(role.admin);

      // Fetch post
     this.postsService.getOneById(this.postId)
     .subscribe(post => {
          if (post.moderated && !isAdmin) {
            this.router.navigateByUrl('/posts/text?page=1');
          }

          this.post = post;
        });
    });

  }

}
