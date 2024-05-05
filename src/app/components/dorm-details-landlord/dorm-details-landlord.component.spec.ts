import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormDetailsLandlordComponent } from './dorm-details-landlord.component';

describe('DormDetailsLandlordComponent', () => {
  let component: DormDetailsLandlordComponent;
  let fixture: ComponentFixture<DormDetailsLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormDetailsLandlordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormDetailsLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
