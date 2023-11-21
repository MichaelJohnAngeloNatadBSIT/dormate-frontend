import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormDialogComponent } from './dorm-dialog.component';

describe('DormDialogComponent', () => {
  let component: DormDialogComponent;
  let fixture: ComponentFixture<DormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
