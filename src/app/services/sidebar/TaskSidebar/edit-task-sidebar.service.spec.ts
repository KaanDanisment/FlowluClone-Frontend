import { TestBed } from '@angular/core/testing';

import { EditTaskSidebarService } from './edit-task-sidebar.service';

describe('EditTaskSidebarService', () => {
  let service: EditTaskSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTaskSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
