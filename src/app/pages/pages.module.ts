import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componentes
 */
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraphicsDonutsComponent } from './../components/graphics-donuts/graphics-donuts.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

/**
 * Routes
 */
import { PAGES_ROUTES } from './pages.routes';

/**
 * Modules
 */
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        IncrementadorComponent,
        GraphicsDonutsComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModalUploadComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule {}
