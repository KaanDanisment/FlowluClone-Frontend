import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNavbarComponent } from './task-navbar.component';

describe('TaskNavbarComponent', () => {
  let component: TaskNavbarComponent;
  let fixture: ComponentFixture<TaskNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
