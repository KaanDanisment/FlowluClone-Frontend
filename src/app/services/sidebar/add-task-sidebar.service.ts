import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTaskSidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  openSidebar() {
    this.sidebarOpen.next(true);
  }

  closeSidebar() {
    this.sidebarOpen.next(false);
  }
}
