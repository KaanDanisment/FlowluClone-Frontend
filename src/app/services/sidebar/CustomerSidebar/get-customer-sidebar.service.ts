import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCustomerSidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();
  private customerIdSubject = new BehaviorSubject<number | null>(null);
  customerId$ = this.customerIdSubject.asObservable();

  openSidebar(customerId: number) {
    this.customerIdSubject.next(customerId);
    this.sidebarOpen.next(true);
  }
  closeSidebar() {
    this.sidebarOpen.next(false);
    this.customerIdSubject.next(null);
  }
}
