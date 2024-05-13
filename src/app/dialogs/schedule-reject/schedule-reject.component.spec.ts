import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRejectComponent } from './schedule-reject.component';

describe('ScheduleRejectComponent', () => {
  let component: ScheduleRejectComponent;
  let fixture: ComponentFixture<ScheduleRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
