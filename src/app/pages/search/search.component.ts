import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params.subscribe( params => {
      const search = params['searching'];
      console.log('esta en', search);
      this.search(search);
    });
  }

  ngOnInit() {
  }

  search( searching: string ) {
    const URL = environment.URL + 'search/all/' + searching;
    this.http.get( URL )
      .subscribe((resp: any) => {
          this.users = resp.users;
          this.hospitals = resp.hospitals;
          this.doctors = resp.doctors;
          console.log(resp);
      });
  }

}
