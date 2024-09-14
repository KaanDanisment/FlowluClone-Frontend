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
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { TeamMemberListComponent } from './team/team-member-list/team-member-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
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
      {
        path: 'customers',
        component: CustomerComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: CustomerListComponent },
        ],
      },
      {
        path: 'myteam',
        component: TeamComponent,
        children: [
          { path: '', redirectTo: 'team-member', pathMatch: 'full' },
          { path: 'team-member', component: TeamMemberListComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
