import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError,tap} from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(authReq).pipe(
      catchError(error => {
        if(error.status === 401) {
          this.router.navigate(['login'])
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
