import { Component } from '@angular/core';
import { ProjectService } from '../../../services/ProjectService/project.service';
import { ProjectDto } from '../../../models/Dto/ProjectDto';
import { Project } from '../../../models/project';
import { ProjectEditSidebarService } from '../../../services/sidebar/ProjectSidebar/project-edit-sidebar.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  projects: ProjectDto[] = [];
  selectedProject: ProjectDto = null;
  selectProject(project: ProjectDto) {
    if (this.selectedProject === project) {
      this.selectedProject = null;
    } else {
      this.selectedProject = project;
    }
  }
  constructor(
    private projectService: ProjectService,
    private editProjectSidebarService: ProjectEditSidebarService
  ) {}

  ngOnInit() {
    this.projectService.getProjects();
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects.filter((p) => p.status === 'active');
    });
  }

  editProject() {
    this.editProjectSidebarService.openSidebar(this.selectedProject.id);
    this.selectedProject = null;
  }

  deleteProject() {
    console.log(this.selectedProject);
    this.projectService
      .deleteProject(this.selectedProject.id)
      .subscribe((error) => {
        console.log('Task could not be deleted', error);
      });
    this.selectedProject = null;
  }
  markComplete() {
    let project = new Project();
    project.id = this.selectedProject.id;
    project.name = this.selectedProject.name;
    project.userId = this.selectedProject.userId;
    project.description = this.selectedProject.description;
    project.startDate = this.selectedProject.startDate;
    project.endDate = this.selectedProject.endDate;
    project.status = 'completed';
    project.createdAt = this.selectedProject.createdAt;
    project.customerId = this.selectedProject.customerId;
    project.income = this.selectedProject.income;
    project.expenses = this.selectedProject.expenses;
    this.projectService.updateProject(project).subscribe(
      (response) => {
        console.log('Project updated succesfuly', response);
      },
      (error) => {
        console.log(error.err);
      }
    );
    this.selectedProject = null;
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
