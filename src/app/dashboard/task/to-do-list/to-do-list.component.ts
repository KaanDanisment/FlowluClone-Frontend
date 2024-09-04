import { ChangeDetectorRef, Component } from '@angular/core';
import { TaskService } from '../../../services/TaskService/task.service';
import { TaskDto } from '../../../models/Dto/TaskDto';
import { Task } from '../../../models/task';
import { EditTaskSidebarService } from '../../../services/sidebar/TaskSidebar/edit-task-sidebar.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  constructor(
    private taskService: TaskService,
    private changeDetector: ChangeDetectorRef,
    private editTaskSidebarService: EditTaskSidebarService
  ) {}

  tasks: TaskDto[] = [];
  openMenuIndex: number | null = null;

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks.filter((task) => task.status !== 'completed');
    });

    this.taskService.getTasks();
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe((error) => {
      console.error('Task could not be deleted', error);
    });
  }
  editTask(taskId: number) {
    this.editTaskSidebarService.openSidebar(taskId);
  }
  completeTask(taskDto: TaskDto) {
    let task = new Task();
    task.id = taskDto.id;
    task.name = taskDto.name;
    task.description = taskDto.description;
    task.projectId = taskDto.projectId;
    task.status = 'completed';
    task.startDate = taskDto.startDate;
    task.endDate = taskDto.endDate;
    task.userId = taskDto.userId;

    this.taskService.updateTask(task).subscribe(
      (response) => {
        console.log('Task updated successfully', response);
      },
      (error) => {
        console.log(error.err);
      }
    );
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
  toggleMenu(index: number): void {
    if (this.openMenuIndex === index) {
      this.openMenuIndex = null;
    } else {
      this.openMenuIndex = index;
    }
  }
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
