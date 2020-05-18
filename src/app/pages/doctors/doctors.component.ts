import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/service.index';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  loading = true;
  doctors: Doctor[] = [];

  constructor(
    public doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.loadDoctors();
  }

  searchDoctors( search: string ) {
    if ( search.length <= 0 ) {
      this.loadDoctors();
      return;
    }
    this.loading = true;

    this.doctorService.searchDoctors( search )
      .subscribe( resp => {
        this.loading = false;
        this.doctors = resp;
      });
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe( resp => {
        this.loading = false;
        this.doctors = resp;
      });
  }

  deleteDoctor( doctor: Doctor ) {
    this.doctorService.deleteHospital( doctor._id )
      .subscribe( () => this.loadDoctors());
  }

  changeSince( since: number ) {
    console.log(since);
  }

}
