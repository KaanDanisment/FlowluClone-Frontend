import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNavbarComponent } from './team-navbar.component';

describe('TeamNavbarComponent', () => {
  let component: TeamNavbarComponent;
  let fixture: ComponentFixture<TeamNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
