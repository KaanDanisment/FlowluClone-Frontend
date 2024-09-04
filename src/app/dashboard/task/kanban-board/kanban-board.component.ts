import { Component, OnInit } from '@angular/core';
import { TaskDto } from '../../../models/Dto/TaskDto';
import { TaskService } from '../../../services/TaskService/task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { EditTaskSidebarService } from '../../../services/sidebar/TaskSidebar/edit-task-sidebar.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent implements OnInit {
  tasks: TaskDto[] = [];
  columns = [
    { title: 'To Do', status: 'to-do', id: 'todoList' },
    { title: 'In Progress', status: 'in-progress', id: 'inProgressList' },
    { title: 'Completed', status: 'completed', id: 'doneList' },
  ];
  connectedLists: string[] = [];
  openMenuIndex: number | null = null;
  constructor(
    private taskService: TaskService,
    private editTaskSidebarService: EditTaskSidebarService
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.taskService.getTasks(); // İlk yükleme için görevleri getir
    this.connectedLists = this.columns.map((column) => column.id);
  }

  getTasksByStatus(status: string): TaskDto[] {
    return this.tasks.filter((task) => task.status === status);
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
}
