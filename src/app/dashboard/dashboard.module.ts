import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { CustomerComponent } from './customer/customer.component';
import { TaskNavbarComponent } from './task/task-navbar/task-navbar.component';
import { TaskListViewComponent } from './task/task-list-view/task-list-view.component';
import { ToDoListComponent } from './task/to-do-list/to-do-list.component';
import { KanbanBoardComponent } from './task/kanban-board/kanban-board.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectNavbarComponent } from './project/project-navbar/project-navbar.component';
import { ProjectArchivedComponent } from './project/project-archived/project-archived.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerNavbarComponent } from './customer/customer-navbar/customer-navbar.component';
import { GetCustomerComponent } from './customer/get-customer/get-customer.component';
import { GetCustomerProjectsComponent } from './customer/get-customer/get-customer-projects/get-customer-projects.component';
import { GetCustomerTasksComponent } from './customer/get-customer/get-customer-tasks/get-customer-tasks.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    TaskComponent,
    ProjectComponent,
    CustomerComponent,
    TaskNavbarComponent,
    TaskListViewComponent,
    ToDoListComponent,
    KanbanBoardComponent,
    AddTaskComponent,
    EditTaskComponent,
    ProjectListComponent,
    ProjectNavbarComponent,
    ProjectArchivedComponent,
    AddProjectComponent,
    EditProjectComponent,
    CustomerListComponent,
    AddCustomerComponent,
    CustomerNavbarComponent,
    GetCustomerComponent,
    GetCustomerProjectsComponent,
    GetCustomerTasksComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
