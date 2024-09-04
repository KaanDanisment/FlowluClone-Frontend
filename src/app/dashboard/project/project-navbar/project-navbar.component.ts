import { Component } from '@angular/core';
import { ProjectAddSidebarService } from '../../../services/sidebar/ProjectSidebar/project-add-sidebar.service';

@Component({
  selector: 'app-project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrl: './project-navbar.component.css',
})
export class ProjectNavbarComponent {
  selectedTab: string = 'List';
  constructor(private addProjectSidebarService: ProjectAddSidebarService) {}
  ngOnInit() {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      this.selectedTab = storedTab;
    }
  }
  openSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.addProjectSidebarService.openSidebar();
  }
  selectTab(button: string) {
    this.selectedTab = button;
    localStorage.setItem('selectedTab', button);
  }
}
