import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';

// Swal
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  upImage: File;
  imgTemp: any;

  constructor( public userService: UserService ) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  saveData( formProfile ) {
    if ( formProfile.invalid ) {
      return;
    }

    this.user.name = formProfile.value.name;
    if ( !this.user.google ) {
      this.user.email = formProfile.value.email;
    }

    this.userService.updateUser( this.user )
      .subscribe();
  }

  selectImage( file: File ) {
    if ( !file ) {
      this.upImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Solo imagenes',
        text: 'El archivo seleccionado no es una imagen',
      });
      this.imgTemp = null;
      return;
    }

    this.upImage = file;

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

  }

  changeImage() {
    console.log(this.upImage);

    this.userService.changeImage( this.upImage, this.user._id );

  }

}
