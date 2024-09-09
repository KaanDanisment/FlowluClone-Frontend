import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/TaskService/task.service';
import { TaskDto } from '../../../models/Dto/TaskDto';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrl: './task-list-view.component.css',
})
export class TaskListViewComponent implements OnInit {
  tasks: TaskDto[] = [];
  isStartDateValid: boolean = false;
  searchTerm: string = '';
  filteredTasks: TaskDto[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }
  filterTasks(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter((task) =>
      task.name.toLowerCase().includes(term)
    );
  }
}
