import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { InoutComponent } from './admin-dashboard/admin-content/inout/inout.component';
import { LaptopComponent } from './admin-dashboard/admin-content/laptop/laptop.component';
import { BackupComponent } from './admin-dashboard/admin-content/backup/backup.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { Overlay } from '@angular/cdk/overlay';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogFormComponent } from './admin-dashboard/admin-content/backup/mat-dialog-form/mat-dialog-form.component';
import { AddItemComponent } from './admin-dashboard/admin-content/inout/add-item/add-item.component';
import { UpdateItemComponent } from './admin-dashboard/admin-content/inout/update-item/update-item.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    AdminDashboardComponent,
    InoutComponent,
    LaptopComponent,
    BackupComponent,
    MatDialogFormComponent,
    AddItemComponent,
    UpdateItemComponent,
  ],
  imports: [
    FormsModule,
    MatPaginatorModule,MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BrowserModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    CommonModule,
  ],

  providers: [
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.block(),
      deps: [Overlay],
    },
  ],
 
})
export class DashboardModule {}
