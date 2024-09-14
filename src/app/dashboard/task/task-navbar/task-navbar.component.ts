import { Component } from '@angular/core';
import { AddTaskSidebarService } from '../../../services/sidebar/TaskSidebar/add-task-sidebar.service';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-task-navbar',
  templateUrl: './task-navbar.component.html',
  styleUrl: './task-navbar.component.css',
})
export class TaskNavbarComponent {
  selectedButton: string = 'Kanban Board';
  userRole: string | null = null;
  constructor(
    private addTaskSidebarService: AddTaskSidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const storedButton = localStorage.getItem('selectedButton');
    if (storedButton) {
      this.selectedButton = storedButton;
    }
    this.userRole = this.authService.getUserRole();
  }

  openSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.addTaskSidebarService.openSidebar();
  }
  selectButton(button: string) {
    this.selectedButton = button;
    localStorage.setItem('selectedButton', button);
  }
}
