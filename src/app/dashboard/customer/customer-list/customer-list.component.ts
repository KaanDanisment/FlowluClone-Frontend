import { Component } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../services/CustomerService/customer.service';
import { GetCustomerSidebarService } from '../../../services/sidebar/CustomerSidebar/get-customer-sidebar.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  customers: Customer[] = [];
  selectedCustomer: Customer = null;
  selectCustomer(customer: Customer) {
    if (this.selectedCustomer === customer) {
      this.selectedCustomer = null;
    } else {
      this.selectedCustomer = customer;
    }
  }
  searchTerm: string = '';
  filteredCustomers: Customer[] = [];
  constructor(
    private customerService: CustomerService,
    private getCustomerSidebarService: GetCustomerSidebarService
  ) {}

  ngOnInit() {
    this.customerService.getCustomers();
    this.customerService.customers$.subscribe((customers) => {
      this.customers = customers;
      this.filterCustomer();
    });
  }
  filterCustomer(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(term)
    );
  }
  deleteCustomer() {
    this.customerService.deleteCustomer(this.selectedCustomer.id).subscribe();
    this.selectedCustomer = null;
  }
  openCustomerSidebar(customer: Customer) {
    this.getCustomerSidebarService.openSidebar(customer.id);
  }
}
