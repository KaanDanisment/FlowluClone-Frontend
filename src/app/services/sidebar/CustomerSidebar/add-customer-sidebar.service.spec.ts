import { TestBed } from '@angular/core/testing';

import { AddCustomerSidebarService } from './add-customer-sidebar.service';

describe('AddCustomerSidebarService', () => {
  let service: AddCustomerSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCustomerSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
