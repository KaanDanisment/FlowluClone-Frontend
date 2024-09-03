import { Component } from '@angular/core';
import { AddTaskSidebarService } from '../../../services/sidebar/add-task-sidebar.service';

@Component({
  selector: 'app-task-navbar',
  templateUrl: './task-navbar.component.html',
  styleUrl: './task-navbar.component.css',
})
export class TaskNavbarComponent {
  selectedButton: string = 'Kanban Board';
  constructor(private addTaskSidebarService: AddTaskSidebarService) {}

  ngOnInit() {
    const storedButton = localStorage.getItem('selectedButton');
    if (storedButton) {
      this.selectedButton = storedButton;
    }
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
