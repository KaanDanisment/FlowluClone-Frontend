import { Component } from '@angular/core';
import { AddCustomerSidebarService } from '../../../services/sidebar/CustomerSidebar/add-customer-sidebar.service';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css',
})
export class CustomerNavbarComponent {
  userRole: string | null = null;
  constructor(
    private addCustomerSidebarService: AddCustomerSidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }
  openSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.addCustomerSidebarService.openSidebar();
  }
}
