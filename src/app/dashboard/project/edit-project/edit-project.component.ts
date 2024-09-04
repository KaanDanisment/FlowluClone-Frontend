import { Component, ElementRef, HostListener } from '@angular/core';
import { Customer } from '../../../models/customer';
import { ProjectEditSidebarService } from '../../../services/sidebar/ProjectSidebar/project-edit-sidebar.service';
import { Project } from '../../../models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/CustomerService/customer.service';
import { ProjectService } from '../../../services/ProjectService/project.service';
import { AlertifyjsService } from '../../../services/AlertifyJsService/alertifyjs.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent {
  isOpen = false;
  customers: Customer[] = [];
  selectedCustomerId: string | undefined;
  projectId: number;

  constructor(
    private editProjectSidebarService: ProjectEditSidebarService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private elementRef: ElementRef,
    private alertifyService: AlertifyjsService
  ) {}

  model: Project = new Project();
  projectForm: FormGroup;
  createProjectForm() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      status: [''],
      startDate: [''],
      endDate: [''],
      customerId: [''],
      income: [''],
      expenses: [''],
    });
  }

  ngOnInit() {
    this.editProjectSidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.editProjectSidebarService.taskId$.subscribe((projectId) => {
      this.projectId = projectId;
      if (this.projectId) {
        this.loadProjectDetail(this.projectId);
      }
    });
    this.createProjectForm();
    this.getCustomers();
  }
  loadProjectDetail(projectId: number) {
    this.projectService.getProjectById(projectId).subscribe((project) => {
      this.projectForm.patchValue({
        name: project.name,
        description: project.description,
        startDate: this.formatDate(project.startDate),
        endDate: this.formatDate(project.endDate),
        income: project.income,
        expenses: project.expenses,
        customerId: project.customerId,
        status: project.status,
      });
    });
  }
  updateProject() {
    if (this.projectForm.valid) {
      this.model = Object.assign({}, this.projectForm.value);
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
      this.model.id = this.projectId;
      this.projectService.updateProject(this.model).subscribe(() => {
        this.alertifyService.success('Project updated successfully');
        this.closeSidebar();
        this.projectForm.reset();
      });
    }
  }
  getCustomers() {
    this.customerService.getCustomers();
    this.customerService.customers$.subscribe((customers) => {
      this.customers = customers;
    });
  }
  closeSidebar() {
    this.editProjectSidebarService.closeSidebar();
  }
  private formatDate(date: string | Date): string {
    if (date === null) {
      return null;
    }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (
      !this.elementRef.nativeElement.contains(targetElement) &&
      !targetElement.closest('.open-sidebar-button') &&
      !targetElement.closest('.edit-project-sidebar')
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
