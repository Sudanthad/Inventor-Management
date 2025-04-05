import { Component } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private userAuthService: UserAuthService,
    private router:Router
  ) {}
  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/login'])

  }
}
