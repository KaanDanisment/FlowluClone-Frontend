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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.taskService.getTasks(); // İlk yükleme için görevleri getir
  }

  checkStartDate(task: TaskDto): boolean {
    const defaultDateString = '0001-01-01T00:00:00';
    const taskStartDate = new Date(task.startDate);
    const defaultDate = new Date(defaultDateString);

    return taskStartDate.getTime() !== defaultDate.getTime();
  }
}
