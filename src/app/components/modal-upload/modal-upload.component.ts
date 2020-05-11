import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image/image.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  hide = '';
  upImage: File;
  imgTemp: any;

  constructor(
    public imageService: ImageService,
    public modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
  }

  selectImage( file: File ) {
    if ( !file ) {
      this.upImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Solo imagenes',
      //   text: 'El archivo seleccionado no es una imagen',
      // });
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

  closeModal() {
    this.imgTemp = null;
    this.upImage = null;

    this.modalUploadService.hideModal();
  }

  upImages() {
    console.log('???');
    this.imageService.upFile( this.upImage, this.modalUploadService.type, this.modalUploadService.id )
      .then( resp => {

        console.log(resp);
        this.modalUploadService.notification.emit( resp );
        this.closeModal();

      }).catch( err => {
        console.log(err);
      });
  }

}
