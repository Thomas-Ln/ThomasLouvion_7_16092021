import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Is User an admin ?
      return this.authService.getUserRole().pipe(
        map(role => {
          const isAdmin: boolean = Boolean(role.admin);

          if (isAdmin) {
            return true;
          } else {
            this.router.navigateByUrl('/posts/text?page=1');
            return false;
          }
        })
      );
  }

}
