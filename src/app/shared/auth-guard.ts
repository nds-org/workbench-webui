import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from '@api/services';
import { Observable } from 'rxjs';

import { State } from './store/state';
// import { User } from '@api/models/user';
// import { UserService } from '@api/services/user.service';
// import { TokenService } from '@api/token.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router,
              private readonly api: ApiService) {}  // , private readonly userService: UserService, private readonly tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>((resolve, reject) => {
      const result = this.checkToken(state);
      if (result) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const result = this.checkToken(state);
      if (result) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  async checkToken(state: RouterStateSnapshot, host?: string): Promise<boolean> {
    const result = await this.api.getCheckToken();

    const url = state.url.startsWith('/') ? state.url.substring(1) : state.url;

    // not logged in so redirect to login page with the return url and return false
    // this.state.returnRoute = url;

    // FIXME: Wire this up
    if (result) {
      // logged in so return true
      return true;
    }

    await this.router.navigate(['login'], { queryParams: { rd: url } });

    return false;
  }
}
