import { TestBed } from '@angular/core/testing';

import { ProjectEditSidebarService } from './project-edit-sidebar.service';

describe('ProjectEditSidebarService', () => {
  let service: ProjectEditSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEditSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
