import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';

// Sweet Alert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadStorage();
  }

  isLogin() {
    return( this.token.length > 1 ) ? true : false;
  }

  loadStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  saveStorage( id: string, token: string, user: User ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loginGoogle( token ) {
    const URL = environment.URL + 'login/google';

    return this.http.post( URL, { idtoken: token } )
      .pipe(
        map((res: any) => {
          this.saveStorage(res.id, res.token, res.user);
          return true;
        })
      );

  }

  login( user, remember ) {
    const URL = environment.URL + 'login';

    if ( remember ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL, user)
      .pipe(
        map( (res: any) => {
          this.saveStorage(res.id, res.token, res.user);
          return true;
        })
      );
  }

  registerUser(user) {
    const URL = environment.URL + 'user';

    return this.http.post(URL, user)
      .pipe(
        map((res: any) => {
          swal('Usuario registrado', user.email, 'success');

          return res.user;
        })
      );
  }
}
