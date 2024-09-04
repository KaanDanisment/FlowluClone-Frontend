import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectEditSidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();
  private projectIdSubject = new BehaviorSubject<number | null>(null);
  taskId$ = this.projectIdSubject.asObservable();

  openSidebar(taskId: number) {
    this.projectIdSubject.next(taskId);
    this.sidebarOpen.next(true);
  }

  closeSidebar() {
    this.sidebarOpen.next(false);
    this.projectIdSubject.next(null);
  }
}
