import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormComponent } from './dorm.component';

describe('DormComponent', () => {
  let component: DormComponent;
  let fixture: ComponentFixture<DormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
