import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'master',
        component: MasterDataComponent,
      },
      {
        path: 'user',
        component: UserManagementComponent,
      },
      {
        path: 'patient',
        component: PatientManagementComponent,
      },
      {
        path: 'pdf',
        component: PdfComponent,
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
