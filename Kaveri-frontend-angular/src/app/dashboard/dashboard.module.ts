import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { PdfComponent } from './pdf/pdf.component';
import { UserComponent } from './dailog/user/user.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    PatientManagementComponent,
    UserManagementComponent,
    MasterDataComponent,
    PdfComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
