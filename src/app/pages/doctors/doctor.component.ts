import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { DoctorService, HospitalService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitales: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'new' ) {
        this.loadDoctor(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.loadHospitals()
      .subscribe( (resp: any) => this.hospitales = resp.hospitals );

    this.modalUploadService.notification
      .subscribe( resp => {
        this.doctor.img = resp.doctor.img;
      });
  }

  loadDoctor( id: string ) {
    this.doctorService.getDoctor( id )
        .subscribe( doctor => {
          console.log(doctor);
          this.doctor = doctor;
          this.doctor.hospital = doctor.hospital._id;
          this.changeHospital( this.doctor.hospital );
        });
  }

  saveDoctor(f) {
    if ( f.invalud ) {
      return;
    }

    this.doctorService.saveDoctor( this.doctor )
      .subscribe( resp => {
        this.doctor._id = resp._id;
        this.router.navigate(['doctor/', resp._id]);
      });
  }

  changeHospital( id: string ) {
    this.hospitalService.getHospital( id )
      .subscribe( resp => this.hospital = resp );  
  }

  changeImg() {
    this.modalUploadService.showModal('doctors', this.doctor._id);
  }

}
