import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectArchivedComponent } from './project-archived.component';

describe('ProjectArchivedComponent', () => {
  let component: ProjectArchivedComponent;
  let fixture: ComponentFixture<ProjectArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectArchivedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
