import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  HospitalService,
  DoctorService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    ModalUploadService,
    LoginGuardGuard,
    // AdminGuard,
    HospitalService,
    DoctorService
  ]
})
export class ServiceModule { }
