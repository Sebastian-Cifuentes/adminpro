import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  since = 0;
  loading = true;

  allRegisters = 0;

  constructor(
    public userService: UserService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUser();

    this.modalUploadService.notification
      .subscribe( resp => this.loadUser());
  }

  showModal( id: string ) {
    this.modalUploadService.showModal( 'users', id );
  }

  loadUser() {
    this.loading = true;
    this.userService.loadUsers( this.since )
      .subscribe( (resp: any) => {
        this.allRegisters = resp.totalUsers;
        this.users = resp.users;
        this.loading = false;

      });
  }

  changeSince( value: number ) {

   const since = this.since + value;

   if ( since >= this.allRegisters ) {
    return;
   }

   if ( since < 0 ) {
    return;
   }

   this.since = this.since + value;
   this.loadUser();

  }

  searchUsers( search: string ) {

    if ( search.length <= 0 ) {
      this.loadUser();
      return;
    }

    this.loading = true;

    console.log(search);
    this.userService.searchUser( search )
      .subscribe( (users: User[]) => {
        console.log(users);
        this.users = users;
        this.loading = false;
      });
  }

  deleteUser( user: User ) {
    if ( user._id === this.userService.user._id ) {
      Swal.fire({
        icon: 'error',
        title: 'No puede borrar usuario',
        text: 'No se puede borrar a si mismo'
      });
    }
    Swal.fire({
      title: '¿Esta seguro que desea eliminar este usuario?',
      text: 'Esta a punto de borrar a ' + user.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser( user._id )
          .subscribe( res =>  {
            this.loadUser();
          });
      }
    });
  }

  saveUser( user: User ) {
    this.userService.updateUser( user )
      .subscribe();
  }

}
