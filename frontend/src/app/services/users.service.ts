import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profile } from './../types/profile';
import { Token } from './../types/token';
import { User } from './../types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  /**GET: name & email of user */
  getProfile(userId: User['id']): Observable<Profile> {
    return this.http.get<Profile>(`/api/auth/profile/${userId}`).pipe(
      catchError(this.handleError<Profile>('Profile'))
    )
  }

  /** POST: create new user */
  signup(user: User): Observable<string> {
    return this.http.post<string>('/api/auth/signup', user).pipe(
      catchError(this.handleError<string>('Signup'))
    );
  }

  /** POST: connect user */
  login(user: User): Observable<Token> {
    return this.http.post<Token>('api/auth/login', user).pipe(
      catchError(this.handleError<Token>('Login'))
      );
    }

  /** STORAGE: remove token */
  logout(): void {
    localStorage.removeItem('token');
  }

  /** POST: delete user by id */
  deleteAccount(userId: User['id']): Observable<any> {
    return this.http.delete<any>((`api/auth/${userId}`)).pipe(
      catchError(this.handleError<any>('DeleteAccount'))
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
