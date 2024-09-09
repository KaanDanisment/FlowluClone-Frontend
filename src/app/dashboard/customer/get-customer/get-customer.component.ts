import { Component, ElementRef } from '@angular/core';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/TaskService/task.service';
import { ProjectService } from '../../../services/ProjectService/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../models/customer';
import { GetCustomerSidebarService } from '../../../services/sidebar/CustomerSidebar/get-customer-sidebar.service';
import { CustomerService } from '../../../services/CustomerService/customer.service';
import { ProjectDto } from '../../../models/Dto/ProjectDto';

@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrl: './get-customer.component.css',
})
export class GetCustomerComponent {
  isOpen = false;
  customerId: number;

  constructor(
    private getCustomerSidebarService: GetCustomerSidebarService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  model: Customer = new Customer();
  customerForm: FormGroup;
  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      contactName: [''],
      contactEmail: [''],
    });
  }

  ngOnInit() {
    this.getCustomerSidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.getCustomerSidebarService.customerId$.subscribe((customerId) => {
      this.customerId = customerId;
      if (this.customerId) {
        this.loadCustomerDetail(this.customerId);
      }
    });
    this.createCustomerForm();
  }
  updateCustomer() {
    if (this.customerForm.valid) {
      this.model = Object.assign({}, this.customerForm.value);
      if (!this.model.email) {
        this.model.email = null;
      }
      if (!this.model.contactName) {
        this.model.contactName = null;
      }
      if (!this.model.contactEmail) {
        this.model.contactEmail = null;
      }
      this.model.id = this.customerId;
      this.customerService.updateCustomer(this.model).subscribe(() => {
        this.closeSidebar();
      });
    }
  }

  loadCustomerDetail(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((customer) => {
      this.customerForm.patchValue({
        name: customer.name,
        email: customer.email,
        contactName: customer.contactName,
        contactEmail: customer.contactEmail,
      });
    });
  }
  closeSidebar() {
    this.getCustomerSidebarService.closeSidebar();
  }
}
