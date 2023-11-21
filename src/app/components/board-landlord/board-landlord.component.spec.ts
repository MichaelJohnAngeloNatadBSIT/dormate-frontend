import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLandlordComponent } from './board-landlord.component';

describe('BoardLandlordComponent', () => {
  let component: BoardLandlordComponent;
  let fixture: ComponentFixture<BoardLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardLandlordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
