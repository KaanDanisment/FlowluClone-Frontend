import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTeamMemberService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  openSidebar() {
    this.sidebarOpen.next(true);
  }

  closeSidebar() {
    this.sidebarOpen.next(false);
  }
}
