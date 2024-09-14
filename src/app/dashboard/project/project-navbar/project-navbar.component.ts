import { Component } from '@angular/core';
import { ProjectAddSidebarService } from '../../../services/sidebar/ProjectSidebar/project-add-sidebar.service';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrl: './project-navbar.component.css',
})
export class ProjectNavbarComponent {
  selectedTab: string = 'List';
  userRole: string | null = null;
  constructor(
    private addProjectSidebarService: ProjectAddSidebarService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      this.selectedTab = storedTab;
    }
    this.userRole = this.authService.getUserRole();
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
