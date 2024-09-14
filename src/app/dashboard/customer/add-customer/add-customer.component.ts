import { Component, ElementRef, HostListener } from '@angular/core';
import { CustomerService } from '../../../services/CustomerService/customer.service';
import { AddCustomerSidebarService } from '../../../services/sidebar/CustomerSidebar/add-customer-sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyjsService } from '../../../services/AlertifyJsService/alertifyjs.service';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  isOpen = false;

  constructor(
    private customerService: CustomerService,
    private addCustomerSidebarService: AddCustomerSidebarService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private alertifyService: AlertifyjsService
  ) {}

  model: Customer = new Customer();
  customerForm: FormGroup;

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      contactEmail: [''],
      contactName: [''],
    });
  }

  ngOnInit() {
    this.addCustomerSidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.createCustomerForm();
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      this.model = Object.assign({}, this.customerForm.value);
    }
    if (!this.model.email) {
      this.model.email = null;
    }
    if (!this.model.contactEmail) {
      this.model.contactEmail = null;
    }
    if (!this.model.contactName) {
      this.model.contactName = null;
    }
    this.customerService.addCustomer(this.model).subscribe(
      () => {
        this.alertifyService.success('Customer added suucessfully');
      },
      (error) => {
        console.log(error);
      }
    );
    this.customerForm.reset();
    this.closeSidebar();
  }
  closeSidebar() {
    this.addCustomerSidebarService.closeSidebar();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (
      !this.elementRef.nativeElement.contains(targetElement) &&
      !targetElement.closest('.open-sidebar-button') &&
      !targetElement.closest('.add-customer-sidebar')
    ) {
      this.closeSidebar();
    }
  }
}
