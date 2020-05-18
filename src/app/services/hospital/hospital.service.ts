import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Sweet Alert
import Swal from 'sweetalert2';

// Services
import { Hospital } from '../../models/hospital.model';
import { UserService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.token = this.userService.token;
  }

  loadHospitals( since?: number ) {
    const URL = environment.URL + 'hospital?since=' + since;
    return this.http.get( URL );
  }

  getHospital( id: string ) {
    const URL = environment.URL + 'hospital/' + id;
    return this.http.get( URL )
      .pipe(
        map( (resp: any) => resp.hospital )
      );
  }

  uploadHospital( hospital: Hospital ) {
    const URL = environment.URL + 'hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put( URL, hospital )
      .pipe(
        map( res => {
          Swal.fire(
            'Hospital actualizado',
            hospital.name,
            'success'
          );
          return true;
        })
      );
  }

  deleteHospital( id ) {
    const URL = environment.URL + 'hospital/' + id + '?token=' + this.token;

    return this.http.delete( URL )
      .pipe(
        map( res => {
          Swal.fire(
            'Hospital eliminado',
            'El hospital a sido eliminado',
            'success'
          );
        })
      );
  }

  createHospital( hospital: Hospital ) {
    const URL = environment.URL + 'hospital/?token=' + this.token;

    return this.http.post(URL, hospital)
      .pipe(
        map( res => {
          Swal.fire(
            'Hospital creado!',
            hospital.name,
            'success'
          );
        })
      );
  }

  searchHospital( search: string ) {
    const URL = environment.URL + 'search/collection/hospitals/' + search;

    return this.http.get( URL )
      .pipe(
        map( (resp: any) => resp.hospitals)
      );
  }
}
