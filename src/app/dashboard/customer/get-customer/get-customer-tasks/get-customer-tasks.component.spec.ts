import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomerTasksComponent } from './get-customer-tasks.component';

describe('GetCustomerTasksComponent', () => {
  let component: GetCustomerTasksComponent;
  let fixture: ComponentFixture<GetCustomerTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCustomerTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCustomerTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
