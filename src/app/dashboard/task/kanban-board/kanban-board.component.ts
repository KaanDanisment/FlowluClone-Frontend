import { Component, HostListener, OnInit } from '@angular/core';
import { TaskDto } from '../../../models/Dto/TaskDto';
import { TaskService } from '../../../services/TaskService/task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { EditTaskSidebarService } from '../../../services/sidebar/TaskSidebar/edit-task-sidebar.service';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent implements OnInit {
  tasks: TaskDto[] = [];
  filteredTasks: TaskDto[] = [];
  searchTerm: string = '';
  columns = [
    { title: 'To Do', status: 'to-do', id: 'todoList' },
    { title: 'In Progress', status: 'in-progress', id: 'inProgressList' },
    { title: 'Completed', status: 'completed', id: 'doneList' },
  ];
  connectedLists: string[] = [];
  openMenuIndex: number | null = null;
  userRole: string | null = null;
  constructor(
    private taskService: TaskService,
    private editTaskSidebarService: EditTaskSidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });

    this.connectedLists = this.columns.map((column) => column.id);

    this.userRole = this.authService.getUserRole();
  }

  getTasksByStatus(status: string): TaskDto[] {
    return this.filteredTasks.filter((task) => task.status === status);
  }
  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(term) ||
        (task.projectName && task.projectName.toLowerCase().includes(term))
    );
  }
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
        console.log('Task deleted:', taskId);
      },
      (error) => {
        console.error('Task could not be deleted', error);
      }
    );
  }
  editTask(taskId: number) {
    this.editTaskSidebarService.openSidebar(taskId);
  }
  drop(event: CdkDragDrop<TaskDto[]>, newStatus: string) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const previousContainerData = event.previousContainer.data;
    const currentContainerData = event.container.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(currentContainerData, previousIndex, currentIndex);
    } else {
      const task = previousContainerData[previousIndex];
      task.status = newStatus;

      transferArrayItem(
        previousContainerData,
        currentContainerData,
        previousIndex,
        currentIndex
      );

      this.tasks = [...this.tasks];

      this.taskService.updateTask(task).subscribe(
        (response) => {
          console.log('Task updated:', response);
        },
        (error) => {
          console.error('Update failed', error);

          transferArrayItem(
            currentContainerData,
            previousContainerData,
            currentIndex,
            previousIndex
          );
          this.tasks = [...this.tasks];
        }
      );
    }
  }
  toggleMenu(taskId: number): void {
    if (this.openMenuIndex === taskId) {
      this.openMenuIndex = null;
    } else {
      this.openMenuIndex = taskId;
    }
  }
  @HostListener('document:click', ['$event'])
  closeMenu(event: Event): void {
    const target = event.target as HTMLElement;

    // Eğer tıklanan element menü içinde değilse menüyü kapat
    if (!target.closest('.task-options')) {
      this.openMenuIndex = null;
    }
  }
}
