import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string, tipo: string= 'user'): any {

    let url = environment.URL + 'image/';

    if (!img) {
      return URL + 'users/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {
      case 'user':
        url += 'users/' + img;
        break;

      case 'hospital':
        url += 'hospitals/' + img;
        break;

      case 'doctor':
        url += url + 'doctors/' + img;
        break;

      default:
        console.log('tipo de imagen debe de ser: user, hospital o doctor', img, tipo);
        url += 'users/xxx';
    }

    return url;
  }

}
