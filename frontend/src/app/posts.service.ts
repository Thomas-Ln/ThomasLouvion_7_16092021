import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createOne(post: Post): Observable<Post> {
    return this.http.post<Post>('/api/posts', post).pipe(
      catchError(this.handleError<Post>('addPost'))
    )
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts').pipe(
      catchError(this.handleError<Post[]>('Posts'))
    );
  }

  getOneById(id: Post["id"]): Observable<Post> {
    return this.http.get<Post>(`/api/posts/${id}`).pipe(
      catchError(this.handleError<Post>(`getPost id=${id}`))
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
