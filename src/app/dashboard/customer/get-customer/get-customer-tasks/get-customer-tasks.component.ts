import { Component } from '@angular/core';
import { GetTasksSidebarService } from '../../../../services/sidebar/TaskSidebar/get-tasks-sidebar.service';
import { TaskService } from '../../../../services/TaskService/task.service';
import { TaskDto } from '../../../../models/Dto/TaskDto';
import { ProjectDto } from '../../../../models/Dto/ProjectDto';
import { ProjectService } from '../../../../services/ProjectService/project.service';

@Component({
  selector: 'app-get-customer-tasks',
  templateUrl: './get-customer-tasks.component.html',
  styleUrl: './get-customer-tasks.component.css',
})
export class GetCustomerTasksComponent {
  isOpen = false;
  projectId: number;
  tasks: TaskDto[] = [];
  project: ProjectDto = new ProjectDto();

  constructor(
    private getTasksSidebarService: GetTasksSidebarService,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.getTasksSidebarService.sidebarOpen$.subscribe((isopen) => {
      this.isOpen = isopen;
    });
    this.getTasksSidebarService.projectId$.subscribe((projectId) => {
      if (projectId) {
        this.projectId = projectId;
        this.projectService.getProjectById(projectId).subscribe((project) => {
          this.project = project;
        });
        this.taskService.getTasksByProjectId(projectId).subscribe((tasks) => {
          this.tasks = tasks;
          console.log(tasks);
        });
      }
    });
  }
  closeSidebar() {
    this.getTasksSidebarService.closeSidebar();
  }
}
