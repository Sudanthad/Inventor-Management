import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName: string = '';
  userPassword: string = '';
  isLoading: boolean = false;

  constructor(
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) return;

    this.isLoading = true;

    this.loginService.login(loginForm.value).subscribe({
      next: (response: any) => {
        this.showSuccessAlert().then(() => {
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          const role = response.user.role[0].roleName;
          const redirectPath = role === 'ADMIN' ? '/admin/laptop' : '/user';
          this.router.navigate([redirectPath]);
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.showErrorAlert(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private showSuccessAlert() {
    return Swal.fire({
      title: 'Login Successful!',
      text: 'You are being redirected...',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        // Optional: Add any cleanup here
      },
    });
  }

  private showErrorAlert(error: any) {
    Swal.fire({
      title: 'Login Failed',
      text: error.error?.message || 'Invalid credentials',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#3f51b5',
    });
  }

  signup() {
    this.router.navigate(['/register']);
  }
}
