import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NpagefoundComponent } from './npagefound/npagefound.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NpagefoundComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NpagefoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ]
})
export class SharedModule {}
