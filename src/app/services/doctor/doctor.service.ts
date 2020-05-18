import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

// Sweet Alert
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  token: string;
  allDoctors = 0;

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) {
    this.token = this.userService.token;
  }

  loadDoctors() {
    const URL = environment.URL + 'doctor/';

    return this.http.get( URL )
      .pipe(

        map( (resp: any) => {
          this.allDoctors = resp.totalDoctors;
          return resp.doctors;
        })
      );
  }

  getDoctor( id: string ) {
    const URL = environment.URL + 'doctor/' + id;

    return this.http.get( URL )
      .pipe(
        map( (resp: any) => {
          return resp.doctor;
        })
      );
  }

  deleteHospital( id ) {
    const URL = environment.URL + 'doctor/' + id + '?token=' + this.token;

    return this.http.delete( URL )
      .pipe(
        map( res => {
          Swal.fire(
            'Doctor eliminado',
            'El doctor a sido eliminado',
            'success'
          );
        })
      );
  }

  searchDoctors( search: string ) {
    const URL = environment.URL + 'search/collection/doctors/' + search;

    return this.http.get( URL )
      .pipe(
        map( (resp: any) => resp.doctors)
      );
  }

  saveDoctor( doctor: Doctor ) {
    let url = environment.URL + 'doctor';

    if ( doctor._id ) {
      // Update
      url += '/' + doctor._id + '?token=' + this.token;
      return this.http.put( url, doctor )
        .pipe(
          map( (resp: any) => {
            Swal.fire(
              'Doctor actualizado!',
              doctor.name,
              'success'
            );
            return resp.doctor;
          })
        )
    } else {
      // Create
      url += '?token=' + this.token;
      return this.http.post( url, doctor )
        .pipe(
          map( (resp: any) => {
            Swal.fire(
              'Doctor creado!',
              doctor.name,
              'success'
            );
            return resp.doctorSave;
          })
        );
    }
  }

}
