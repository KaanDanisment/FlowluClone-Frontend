import { Component } from '@angular/core';
import { ProjectDto } from '../../../models/Dto/ProjectDto';
import { ProjectService } from '../../../services/ProjectService/project.service';

@Component({
  selector: 'app-project-archived',
  templateUrl: './project-archived.component.html',
  styleUrl: './project-archived.component.css',
})
export class ProjectArchivedComponent {
  projects: ProjectDto[] = [];
  selectedProject: ProjectDto = null;
  selectProject(project: ProjectDto) {
    if (this.selectedProject === project) {
      this.selectedProject = null;
    } else {
      this.selectedProject = project;
    }
  }

  constructor(private projectService: ProjectService) {}
  ngOnInit() {
    this.projectService.getProjects();
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects.filter((p) => p.status === 'completed');
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.selectedProject.id).subscribe();
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
