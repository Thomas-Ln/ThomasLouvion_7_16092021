import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  createOne(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('/api/comments', comment).pipe(
      catchError(this.handleError<Comment>('addComment'))
    )
  }

  getAllByPostId(postId: Post["id"]): Observable<Comment[]> {
    return this.http.get<Comment[]>(`api/comments/post/${postId}`).pipe(
      catchError(this.handleError<Comment[]>('Comments'))
    );
  }

  getAllByPostForAdmin(postId: Post["id"]): Observable<Comment[]> {
    return this.http.get<Comment[]>(`api/comments/admin/${postId}`).pipe(
      catchError(this.handleError<Comment[]>('Comments'))
    );
  }

   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
