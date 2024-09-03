import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditTaskSidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();
  private taskIdSubject = new BehaviorSubject<number | null>(null);
  taskId$ = this.taskIdSubject.asObservable();

  openSidebar(taskId: number) {
    this.taskIdSubject.next(taskId);
    this.sidebarOpen.next(true);
  }

  closeSidebar() {
    this.sidebarOpen.next(false);
    this.taskIdSubject.next(null);
  }
}
