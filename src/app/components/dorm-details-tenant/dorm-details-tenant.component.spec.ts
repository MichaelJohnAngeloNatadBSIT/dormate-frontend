import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormDetailsTenantComponent } from './dorm-details-tenant.component';

describe('DormDetailsTenantComponent', () => {
  let component: DormDetailsTenantComponent;
  let fixture: ComponentFixture<DormDetailsTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormDetailsTenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormDetailsTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
