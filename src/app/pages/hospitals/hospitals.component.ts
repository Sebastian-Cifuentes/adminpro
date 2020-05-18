import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  loading = true;
  hospitals: Hospital[] = [];
  since = 0;
  allHospitals = 0;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHospitals();

    this.modalUploadService.notification
      .subscribe( resp => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals(this.since)
      .subscribe( (resp: any) => {
        this.allHospitals = resp.totalHospitals;
        this.hospitals = resp.hospitals;
        this.loading = false;
      });
  }

  searchHospitals( value ) {
    if ( value.length <= 0 ) {
      return;
    }
    this.loading = true;
    this.hospitalService.searchHospital( value )
      .subscribe(resp => {
        this.loading = false;
        this.hospitals = resp;
      });
  }

  saveHospital( hospital: Hospital ) {
    this.hospitalService.uploadHospital( hospital )
      .subscribe();
  }

  createHospital( ) {
    Swal.fire({
      title: 'Ingrese el nombre del hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if ( !result.value || result.value === 0 ) {
        return;
      }

      if (result.value) {
        const hospital = new Hospital(
          result.value
        );
        this.hospitalService.createHospital( hospital )
          .subscribe();
        this.loadHospitals();
      }
    });
  }

  deleteHospital( hospital: Hospital ) {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar este hospital?',
      text: 'Esta a punto de borrar a ' + hospital.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.deleteHospital( hospital._id )
          .subscribe( res =>  {
            this.loadHospitals();
          });
      }
    });
  }

  showModal( id ) {
    this.modalUploadService.showModal( 'hospitals', id );
  }

  changeSince( value: number ) {
    const since = this.since + value;

    if ( since >= this.allHospitals || since < 0 ) {
      return;
    }

    this.since = since;
    this.loadHospitals();
  }

}
