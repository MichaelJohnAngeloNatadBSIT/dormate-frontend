import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormDetailsComponent } from './dorm-details.component';

describe('DormDetailsComponent', () => {
  let component: DormDetailsComponent;
  let fixture: ComponentFixture<DormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
