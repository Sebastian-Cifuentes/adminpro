import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //     title: 'Principal',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Dashboard', url: '/dashboard' },
  //       { title: 'Progress bar', url: '/progress' },
  //       { title: 'Graficas', url: '/graficas1' },
  //       { title: 'Promesas', url: '/promesas' },
  //       { title: 'RxJs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: '/users' },
  //       { title: 'Doctores', url: '/doctors' },
  //       { title: 'Hospitales', url: '/hospitals' }
  //     ]
  //   }
  // ];

  constructor(
    public userService: UserService
  ) { }

  loadMenu() {
    this.menu = this.userService.menu;
  }
}
