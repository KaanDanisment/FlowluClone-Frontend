import { Component, ElementRef, HostListener } from '@angular/core';
import { ProjectAddSidebarService } from '../../../services/sidebar/ProjectSidebar/project-add-sidebar.service';
import { Project } from '../../../models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/ProjectService/project.service';
import { CustomerService } from '../../../services/CustomerService/customer.service';
import { Customer } from '../../../models/customer';
import { AlertifyjsService } from '../../../services/AlertifyJsService/alertifyjs.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {
  isOpen = false;

  constructor(
    private projectService: ProjectService,
    private customerService: CustomerService,
    private addProjectSidebarService: ProjectAddSidebarService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private alertifyService: AlertifyjsService
  ) {}
  model: Project = new Project();
  customers: Customer[] = [];
  projectForm: FormGroup;

  createProjectForm() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: [''],
      customerId: [''],
      income: [''],
      expenses: [''],
    });
  }
  ngOnInit() {
    this.addProjectSidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.createProjectForm();
    this.getCustomers();
  }
  saveProject() {
    if (this.projectForm.valid) {
      this.model = Object.assign({}, this.projectForm.value);
    }
    if (!this.model.description || this.model.description.trim() === '') {
      this.model.description = null;
    }
    if (!this.model.startDate) {
      this.model.startDate = null;
    }
    if (!this.model.endDate) {
      this.model.endDate = null;
    }
    if (!this.model.income) {
      this.model.income = null;
    }
    if (!this.model.expenses) {
      this.model.expenses = null;
    }
    if (!this.model.customerId) {
      this.model.customerId = 0;
    }
    this.model.status = 'active';
    this.projectService.addProject(this.model).subscribe(
      () => {
        this.alertifyService.success('Project added suucessfully');
      },
      (error) => {
        console.log(error.err);
      }
    );
    this.projectForm.reset();
    this.closeSidebar();
  }
  getCustomers() {
    this.customerService.getCustomers();
    this.customerService.customers$.subscribe((customers) => {
      this.customers = customers;
    });
  }
  closeSidebar() {
    this.addProjectSidebarService.closeSidebar();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (
      !this.elementRef.nativeElement.contains(targetElement) &&
      !targetElement.closest('.open-sidebar-button') &&
      !targetElement.closest('.add-project-sidebar')
    ) {
      this.closeSidebar();
    }
  }
  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  minEndDate: string | undefined;

  onStartDateChange(event: Event) {
    const startDate = (event.target as HTMLInputElement).value;
    this.minEndDate = this.calculateMinEndDate(startDate);

    const endDateInput = document.getElementById('end') as HTMLInputElement;
    if (endDateInput.value < this.minEndDate) {
      endDateInput.value = this.minEndDate;
    }
  }

  calculateMinEndDate(startDate: string): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
}
