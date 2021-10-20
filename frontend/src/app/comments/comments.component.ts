import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from './../comments.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCommentsOfPost();
  }

  // return comment of post/:id
  getCommentsOfPost() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.commentsService.getAllByPostId(id)
      .subscribe(comments => this.comments = comments)
  }
}
