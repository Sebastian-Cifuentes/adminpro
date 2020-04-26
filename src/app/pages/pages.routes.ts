import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

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
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
