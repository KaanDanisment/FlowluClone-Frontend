import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TaskComponent } from './task/task.component';
import { TaskListViewComponent } from './task/task-list-view/task-list-view.component';
import { ToDoListComponent } from './task/to-do-list/to-do-list.component';
import { KanbanBoardComponent } from './task/kanban-board/kanban-board.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectArchivedComponent } from './project/project-archived/project-archived.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks',
        component: TaskComponent,
        children: [
          { path: '', redirectTo: 'kanban-board', pathMatch: 'full' },
          { path: 'list-view', component: TaskListViewComponent },
          { path: 'to-do-list', component: ToDoListComponent },
          { path: 'kanban-board', component: KanbanBoardComponent },
        ],
      },
      {
        path: 'projects',
        component: ProjectComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProjectListComponent },
          { path: 'archived', component: ProjectArchivedComponent },
        ],
      },
      { path: 'customers', component: CustomerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
