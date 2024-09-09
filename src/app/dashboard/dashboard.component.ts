import { Component } from '@angular/core';
import { ProjectDto } from '../models/Dto/ProjectDto';
import { TaskDto } from '../models/Dto/TaskDto';
import { ProjectService } from '../services/ProjectService/project.service';
import { TaskService } from '../services/TaskService/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
