import { Component } from '@angular/core';
import { AddCustomerSidebarService } from '../../../services/sidebar/CustomerSidebar/add-customer-sidebar.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css',
})
export class CustomerNavbarComponent {
  constructor(private addCustomerSidebarService: AddCustomerSidebarService) {}

  openSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.addCustomerSidebarService.openSidebar();
  }
}
