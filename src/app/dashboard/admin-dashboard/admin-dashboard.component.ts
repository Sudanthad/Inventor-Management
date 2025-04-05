import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/auth/user-auth.service';
import { AdminService } from './admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private adminService: AdminService
  ) {}
  public logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of the system',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      backdrop: `
      rgba(0,0,123,0.4)
      url("/assets/images/wave.gif")
      left top
      no-repeat
    `,
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading animation
        Swal.fire({
          title: 'Logging out...',
          html: 'Please wait while we secure your session',
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            // Perform actual logout
            this.userAuthService.clear();
            this.router.navigate(['/login']);

            // Show success message
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Logged out successfully!',
              showConfirmButton: false,
              timer: 2000,
              backdrop: false,
            });
          },
        });
      }
    });
  }
  public inandout() {
    {
      this.router.navigate(['/inandout']);
    }
  }
}

