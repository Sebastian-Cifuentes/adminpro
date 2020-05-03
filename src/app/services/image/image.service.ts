import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  upFile( file: File, type: string, id: string ) {

    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'img', file, file.name );

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
              console.log('Imagen subida');
              resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }

        }
      };

      const URL = environment.URL + 'upload/' + type + '/' + id;

      xhr.open('PUT', URL, true);
      xhr.send( formData );

    });
  }

}
