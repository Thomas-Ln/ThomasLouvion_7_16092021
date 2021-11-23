import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getToken() {
    return this.auth ? JSON.parse(this.auth).token : null;
  }

  getUserId() {
    return this.auth ? JSON.parse(this.auth).userId : null;
  }

  getUserRole() : Observable<any> {
    return this.http.get<any>(`/api/auth/admin`).pipe(
      catchError(this.handleError<any>(`getUserRole`))
      );
    }

  /**
   * @summary Handle the update of the 'moderated' field of posts/comments tables in database
   * @param value TRUE if content must be moderated FALSE if must be unmoderated
   * @param type Tell which table must be updated
   * @param id Tell which line must be updated
  */
  moderate(value: boolean, type: 'posts' | 'comments', id: number) : Observable<any> {
    return this.http.put<any>(`/api/${type}/moderate/${id}`, {moderated: value}).pipe(
      catchError(this.handleError<any>(`Moderate`))
    )
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
