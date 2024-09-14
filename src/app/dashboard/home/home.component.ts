import { Component } from '@angular/core';
import { ProjectDto } from '../../models/Dto/ProjectDto';
import { TaskDto } from '../../models/Dto/TaskDto';
import { ProjectService } from '../../services/ProjectService/project.service';
import { TaskService } from '../../services/TaskService/task.service';
import { AddTaskSidebarService } from '../../services/sidebar/TaskSidebar/add-task-sidebar.service';
import { ProjectAddSidebarService } from '../../services/sidebar/ProjectSidebar/project-add-sidebar.service';
import { AuthService } from '../../services/AuthService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  projects: ProjectDto[] = [];
  tasks: TaskDto[] = [];
  userRole: string | null = null;
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private addTaskSidebarService: AddTaskSidebarService,
    private addProjectSidebarService: ProjectAddSidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.projectService.getProjects();
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
    this.taskService.getTasks();
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.userRole = this.authService.getUserRole();
  }
  openAddTaskSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.addTaskSidebarService.openSidebar();
  }
  openAddProjectSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.addProjectSidebarService.openSidebar();
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
  getTimeAgo(startDate: Date): string {
    const start = new Date(startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `Just now`;
    }
  }
  getTimeRemaining(endDate: Date): string {
    const due = new Date(endDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `in ${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `in ${months} month${months > 1 ? 's' : ''}`;
    } else if (weeks > 0) {
      return `in ${weeks} week${weeks > 1 ? 's' : ''}`;
    } else if (days > 0) {
      return `in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `soon`;
    }
  }
}
