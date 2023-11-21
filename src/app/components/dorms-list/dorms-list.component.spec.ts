import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormsListComponent } from './dorms-list.component';

describe('DormsListComponent', () => {
  let component: DormsListComponent;
  let fixture: ComponentFixture<DormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
