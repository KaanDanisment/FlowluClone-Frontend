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
import { ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './task/edit-task/edit-task.component';

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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
