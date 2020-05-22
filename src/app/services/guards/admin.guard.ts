import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public userService: UserService
  ) {}

  canActivate() {

    if ( this.userService.user.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log('Bloqueado por el ADMIN GUARD AJAJAJ!');
      this.userService.logout();
      return false;
    }
  }
}
