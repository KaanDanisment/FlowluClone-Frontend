import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ProjectService } from '../../../services/ProjectService/project.service';
import { ProjectDto } from '../../../models/Dto/ProjectDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/TaskService/task.service';
import { AlertifyjsService } from '../../../services/AlertifyJsService/alertifyjs.service';
import { AddTaskSidebarService } from '../../../services/sidebar/TaskSidebar/add-task-sidebar.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  isOpen = false;
  projects: ProjectDto[] = [];
  selectedProjectId: string | undefined;

  constructor(
    private addTaskSidebarService: AddTaskSidebarService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private alertifyService: AlertifyjsService,
    private changeDetector: ChangeDetectorRef,
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
    });
  }
  ngOnInit() {
    this.addTaskSidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
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

  saveTask() {
    if (this.taskForm.valid) {
      this.model = Object.assign({}, this.taskForm.value);
    }
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
    this.model.status = 'to-do';

    this.taskService.addTask(this.model).subscribe(
      () => {
        this.alertifyService.success('Task added suucessfully');
      },
      (error) => {
        console.log(error.err);
      }
    );
    this.closeSidebar();
    this.taskForm.reset();
  }

  closeSidebar() {
    this.addTaskSidebarService.closeSidebar();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (
      !this.elementRef.nativeElement.contains(targetElement) &&
      !targetElement.closest('.open-sidebar-button') &&
      !targetElement.closest('.add-task-sidebar')
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
    this.minEndDate = this.calculateMinEndDate(startDate);

    const endDateInput = document.getElementById('end') as HTMLInputElement;
    if (endDateInput.value < this.minEndDate) {
      endDateInput.value = this.minEndDate;
    }
  }

  calculateMinEndDate(startDate: string): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
}
