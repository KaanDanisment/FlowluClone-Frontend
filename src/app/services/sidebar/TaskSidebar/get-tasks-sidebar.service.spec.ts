import { TestBed } from '@angular/core/testing';

import { GetTasksSidebarService } from './get-tasks-sidebar.service';

describe('GetTasksSidebarService', () => {
  let service: GetTasksSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTasksSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
