import { TestBed } from '@angular/core/testing';

import { ProjectAddSidebarService } from './project-add-sidebar.service';

describe('ProjectAddSidebarService', () => {
  let service: ProjectAddSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAddSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
