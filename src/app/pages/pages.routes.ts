import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard', description: 'Esta página es Dashboard'}},
            { path: 'progress', component: ProgressComponent, data: {title: 'Progreso', description: 'Esta página es Progreso'}},
            { path: 'graficas1', component: Graficas1Component, data: {title: 'Graficas', description: 'Esta página es Graficas'}},
            { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas', description: 'Esta página es Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs', description: 'Esta página es RxJs'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Ajustes del tema',
              description: 'Esta página es Ajustes del tema'} },

            // Maintenances
            { path: 'users', component: UsersComponent, data: {title: 'Mantenimiento de usuarios', description: 'Usuarios de la cuenta'} },
            { path: 'hospitals', component: HospitalsComponent, data: {title: 'Mantenimiento de hospitales', description: 'Hospitales actuales'} },
            { path: 'doctors', component: DoctorsComponent, data: {title: 'Mantenimiento de doctores', description: 'Doctores actuales'} },
            { path: 'doctor/:id', component: DoctorComponent, data: {title: 'Actualizar medico', description: 'Actulizar medico'} },
            { path: 'profile', component: ProfileComponent, data: {title: 'Perfil', description: 'Perfil del usuario'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
