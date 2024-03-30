import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerComponentComponent } from './time-picker-component.component';

describe('TimePickerComponentComponent', () => {
  let component: TimePickerComponentComponent;
  let fixture: ComponentFixture<TimePickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePickerComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimePickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
