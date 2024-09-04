import { TestBed } from '@angular/core/testing';

import { AddTaskSidebarService } from './add-task-sidebar.service';

describe('AddTaskSidebarService', () => {
  let service: AddTaskSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
