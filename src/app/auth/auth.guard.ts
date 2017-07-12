import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(null, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(route);
  }

  private check(route?: Route, state?: RouterStateSnapshot) {
    const url = route != null ? `/${route.path}` : state.url;
    return new Observable<boolean>((observer) => {
      this.auth.isAuthenticated()
        .subscribe((loggedIn: boolean) => {
          if (url === '/signin' || url === '/signup') {
            if (loggedIn) {
              this.router.navigate(['/']);
              observer.next(false);
              return observer.complete();
            }
            observer.next(true);
            return observer.complete();
          }
          if (!loggedIn) {
            this.router.navigate(['/signin']);
            observer.next(false);
            return observer.complete();
          }
          observer.next(true);
          return observer.complete();
        });
    });
  }
}
