import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomerProjectsComponent } from './get-customer-projects.component';

describe('GetCustomerProjectsComponent', () => {
  let component: GetCustomerProjectsComponent;
  let fixture: ComponentFixture<GetCustomerProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCustomerProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCustomerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
