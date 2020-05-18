import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress bar', url: '/progress' },
        { title: 'Graficas', url: '/graficas1' },
        { title: 'Promesas', url: '/promesas' },
        { title: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',  
      submenu: [
        { title: 'Usuarios', url: '/users' },
        { title: 'Doctores', url: '/doctors' },
        { title: 'Hospitales', url: '/hospitals' }
      ]
    }
  ];

  constructor() { }
}
