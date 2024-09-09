import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ProjectDto } from '../../../models/Dto/ProjectDto';
import { ProjectService } from '../../../services/ProjectService/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/TaskService/task.service';
import { AlertifyjsService } from '../../../services/AlertifyJsService/alertifyjs.service';
import { Task } from '../../../models/task';
import { EditTaskSidebarService } from '../../../services/sidebar/TaskSidebar/edit-task-sidebar.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  isOpen = false;
  projects: ProjectDto[] = [];
  taskId: number;

  constructor(
    private editTaskSidebarService: EditTaskSidebarService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private alertifyService: AlertifyjsService,
    private elementRef: ElementRef
  ) {}

  model: Task = new Task();
  taskForm: FormGroup;

  createTaskFrom() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: [''],
      projectId: [''],
      status: [''],
    });
  }
  ngOnInit() {
    this.editTaskSidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.editTaskSidebarService.taskId$.subscribe((taskId) => {
      this.taskId = taskId;
      if (this.taskId) {
        this.loadTaskDetails(this.taskId);
      }
    });
    this.createTaskFrom();
    this.getProjects();
  }
  getProjects() {
    this.projectService.getProjects();
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }
  loadTaskDetails(taskId: number) {
    this.taskService.getTaskById(taskId).subscribe((task) => {
      this.taskForm.patchValue({
        name: task.name,
        description: task.description,
        startDate: this.formatDate(task.startDate),
        endDate: this.formatDate(task.endDate),
        projectId: task.projectId,
        status: task.status,
      });
    });
  }
  private formatDate(date: string | Date): string {
    if (date === null) {
      return null;
    }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateTask() {
    if (this.taskForm.valid) {
      this.model = Object.assign({}, this.taskForm.value);
      if (!this.model.description || this.model.description.trim() === '') {
        this.model.description = null;
      }
      if (!this.model.startDate) {
        this.model.startDate = null;
      }
      if (!this.model.endDate) {
        this.model.endDate = null;
      }
      if (!this.model.projectId) {
        this.model.projectId = 0;
      }
      this.model.id = this.taskId;
      console.log(this.model);
      this.taskService.updateTask(this.model).subscribe(
        () => {
          this.alertifyService.success('Task updated successfully');
          this.closeSidebar();
          this.taskForm.reset();
        },
        (error) => {
          console.log(error.err);
        }
      );
    }
  }

  closeSidebar() {
    this.editTaskSidebarService.closeSidebar();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (
      !this.elementRef.nativeElement.contains(targetElement) &&
      !targetElement.closest('.open-sidebar-span') &&
      !targetElement.closest('[cdkDropList]')
    ) {
      this.closeSidebar();
    }
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  minEndDate: string | undefined;

  onStartDateChange(event: Event) {
    const startDate = (event.target as HTMLInputElement).value;
    if (!startDate) {
      this.minEndDate = null;
      return;
    }
    this.minEndDate = this.calculateMinEndDate(startDate);

    const endDateInput = document.getElementById('end') as HTMLInputElement;
    if (endDateInput.value < this.minEndDate) {
      endDateInput.value = this.minEndDate;
    }
  }

  calculateMinEndDate(startDate: string): string {
    if (startDate === null) {
      return null;
    }
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
}
