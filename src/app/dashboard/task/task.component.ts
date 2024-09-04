import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/TaskService/task.service';
import { Task } from '../../models/task';
import { TaskDto } from '../../models/Dto/TaskDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const lastSelectedView = localStorage.getItem('selectedButton');
    if (!lastSelectedView) {
      this.router.navigate(['dashboard/tasks/kanban-board']);
    }
    if (lastSelectedView === 'List View') {
      this.router.navigate(['dashboard/tasks/list-view']);
    } else if (lastSelectedView === 'To-Do List') {
      this.router.navigate(['dashboard/tasks/to-do-list']);
    } else if (lastSelectedView === 'Kanban Board') {
      this.router.navigate(['dashboard/tasks/kanban-board']);
    }
  }
}
