import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTasksSidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();
  private projectIdSubject = new BehaviorSubject<number | null>(null);
  projectId$ = this.projectIdSubject.asObservable();

  openSidebar(projectId: number) {
    this.projectIdSubject.next(projectId);
    this.sidebarOpen.next(true);
  }

  closeSidebar() {
    this.sidebarOpen.next(false);
    this.projectIdSubject.next(null);
  }
}
