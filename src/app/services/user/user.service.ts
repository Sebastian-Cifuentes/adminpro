import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ImageService } from '../image/image.service';

// Sweet Alert
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public imageService: ImageService
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
          Swal.fire(
            'Usuario registrado',
            user.email,
            'success'
          );
          return res.user;
        })
      );
  }

  updateUser(user: User) {
    let URL = environment.URL + 'user/' + user._id;
    URL += '?token=' + this.token;
    return this.http.put( URL, user )
      .pipe(
        map( (resp: any) => {
          if ( user._id === this.user._id ) {
            const userdb = resp.user;
            this.saveStorage( userdb, this.token, userdb );
          }
          Swal.fire(
            'Usuario actualizado',
            user.name,
            'success'
          );
          return true;
        })
      );
  }

  changeImage( file: File, id: string ) {

    this.imageService.upFile( file, 'users', id )
      .then( (resp: any ) => {
        console.log(resp);
        this.user.img = resp.user.img;
        Swal.fire(
          'Imagen actualizada!',
          resp.user.name,
          'success'
        );
        this.saveStorage( id, this.token, this.user );
      })
      .catch( err => {
        console.log(err);
      });

  }

  loadUsers( since: number = 0 ) {

    const URL = environment.URL + 'user?since=' + since;
    return this.http.get( URL );

  }

  searchUser( search: string ) {
    const URL = environment.URL + 'search/collection/users/' + search;
    console.log(URL);
    return this.http.get( URL )
      .pipe(
        map( (resp: any) => resp.users )
      );
  }

  deleteUser( id: string ) {
    const URL = environment.URL + 'user/' + id + '?token=' + this.token;
    return this.http.delete( URL )
      .pipe(
        map(resp => {
          Swal.fire(
            'Usuario eliminado',
            'El usuario a sido eliminado',
            'success'
          );
        })
      );
  }

}
