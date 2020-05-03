import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';

// Swal
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

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
      .subscribe(resp => console.log(resp));
  }

  selectImage( file: File ) {
    if ( !file ) {
      this.upImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal( 'Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imgTemp = null;
      return;
    }

    this.upImage = file;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

  }

  changeImage() {
    console.log(this.upImage);

    this.userService.changeImage( this.upImage, this.user._id );

  }

}
