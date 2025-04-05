import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { AdminService } from '../dashboard/admin-dashboard/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private adminService: AdminService) {}

  // toggleMenu() {
  //   this.adminService.toggle();
  // }
  
}
