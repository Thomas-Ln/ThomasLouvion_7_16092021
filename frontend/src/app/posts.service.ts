import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CountAndAll } from './count-and-all';
import { Post } from './post';
import { User } from './user';

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

  createOneWithImage(post: {user_id: User['id'], title: string}, image: File): Observable<Post> {
    const postData = new FormData();
    postData.append('post', JSON.stringify(post));
    postData.append('image', image, post.title);

    return this.http.post<Post>('/api/posts', postData).pipe(
      catchError(this.handleError<Post>('addPostWithImage'))
    )
  }

  getAll(page: number): Observable<CountAndAll<Post>> {
    return this.http.get<CountAndAll<Post>>(`/api/posts?page=${page}`).pipe(
      catchError(this.handleError<CountAndAll<Post>>('Posts'))
    );
  }

  /**
   * Fetch only text OR image posts
   */
  getAllByType(type: string, page: number): Observable<CountAndAll<Post>> {
    return this.http.get<CountAndAll<Post>>(`/api/posts/type/${type}?page=${page}`).pipe(
      catchError(this.handleError<CountAndAll<Post>>('Posts'))
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
