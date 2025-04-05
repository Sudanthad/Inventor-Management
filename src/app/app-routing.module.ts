import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { InoutComponent } from './dashboard/admin-dashboard/admin-content/inout/inout.component';
import { LaptopComponent } from './dashboard/admin-dashboard/admin-content/laptop/laptop.component';
import { BackupComponent } from './dashboard/admin-dashboard/admin-content/backup/backup.component';
import { PrinterComponent } from './dashboard/admin-dashboard/admin-content/printer/printer.component';


// import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
 
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'inandout', component: InoutComponent}, // Child route
      { path: 'laptop', component: LaptopComponent }, // Child route
      { path: 'backup', component: BackupComponent }, // Child route
      { path: 'printer', component: PrinterComponent }, // Child route
    ],

    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'header', component: HeaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
