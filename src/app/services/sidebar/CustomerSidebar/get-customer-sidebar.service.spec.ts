import { TestBed } from '@angular/core/testing';

import { GetCustomerSidebarService } from './get-customer-sidebar.service';

describe('GetCustomerSidebarService', () => {
  let service: GetCustomerSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomerSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
