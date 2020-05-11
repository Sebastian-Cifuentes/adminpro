import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function init_plugins();

// Router
import { Router } from '@angular/router';

// Sweet Alert
import Swal from 'sweetalert2';

// Modelos
import { User } from '../models/user.model';

// Servicios
import { UserService } from '../services/service.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  equalsPassword(pass1: string, pass2: string) {
    return (group: FormGroup) => {
      const password1 = group.controls[pass1].value;
      const password2 = group.controls[pass2].value;
      if ( password1 === password2 ) {
        return null;
      }

      return {
        equalsPassword: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condition: new FormControl( false )
    }, { validators: this.equalsPassword('password', 'password2') } );
  }

  registerUser() {
    if ( this.form.invalid ) {
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.registerUser( user )
      .subscribe( resp => this.router.navigate(['/login']));
  }

}
