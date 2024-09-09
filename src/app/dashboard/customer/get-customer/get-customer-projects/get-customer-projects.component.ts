import { Component } from '@angular/core';
import { ProjectDto } from '../../../../models/Dto/ProjectDto';
import { ProjectService } from '../../../../services/ProjectService/project.service';
import { GetCustomerSidebarService } from '../../../../services/sidebar/CustomerSidebar/get-customer-sidebar.service';
import { GetTasksSidebarService } from '../../../../services/sidebar/TaskSidebar/get-tasks-sidebar.service';

@Component({
  selector: 'app-get-customer-projects',
  templateUrl: './get-customer-projects.component.html',
  styleUrl: './get-customer-projects.component.css',
})
export class GetCustomerProjectsComponent {
  projects: ProjectDto[] = [];
  projectIds: number[] = [];
  customerId: number;

  constructor(
    private projectService: ProjectService,
    private getCustomerSidebarService: GetCustomerSidebarService,
    private getTasksSidebarService: GetTasksSidebarService
  ) {}

  ngOnInit() {
    this.getCustomerSidebarService.customerId$.subscribe((customerId) => {
      if (customerId) {
        this.customerId = customerId;
        this.getProjects(customerId);
      }
    });
  }
  getProjects(customerId: number) {
    this.projectService.getProjectsByCustomerId(customerId);
    this.projectService.projectByCustomerId$.subscribe((projects) => {
      this.projects = projects;
    });
  }
  openTaskSidebar(project: ProjectDto) {
    this.getTasksSidebarService.openSidebar(project.id);
  }
  onMouseMove(event: MouseEvent): void {
    const tableContainer = event.currentTarget as HTMLElement;
    const boundingRect = tableContainer.getBoundingClientRect();
    const mouseX = event.clientX - boundingRect.left;

    const scrollThreshold = 100; // Scroll başlama mesafesi
    const scrollAmount = 20; // Scroll miktarı

    if (mouseX < scrollThreshold) {
      tableContainer.scrollLeft -= scrollAmount;
    } else if (mouseX > boundingRect.width - scrollThreshold) {
      tableContainer.scrollLeft += scrollAmount;
    }
  }
}
