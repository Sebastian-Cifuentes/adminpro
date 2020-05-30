import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Token verifyToken');
    const token = this.userService.token;
    const payload = JSON.parse( atob( token.split('.')[1]));
    const exp = this.exp( payload.exp );
    if ( exp ) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verifyToken(payload.exp);
  }

  verifyToken( dateExp: number ): Promise<boolean> {
    return new Promise(( resolve, reject) => {
      const tokenExp = new Date( dateExp * 1000 );
      const now = new Date();
      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ));

      if ( tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this.userService.updateToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }
      resolve(true);
    });
  }

  exp( dateExp: number ) {
    const now = new Date().getTime() / 1000;
    if ( dateExp < now ) {
      return true;
    } else {
      return false;
    }
  }

}
