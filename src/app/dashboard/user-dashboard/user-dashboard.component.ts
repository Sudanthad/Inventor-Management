import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login/login.service';
import { UserAuthService } from 'src/app/auth/user-auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public loginService:LoginService
  ) {}
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }
}
