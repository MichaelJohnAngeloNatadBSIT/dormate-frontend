import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptAsTenantDialogComponent } from './accept-as-tenant-dialog.component';

describe('AcceptAsTenantDialogComponent', () => {
  let component: AcceptAsTenantDialogComponent;
  let fixture: ComponentFixture<AcceptAsTenantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptAsTenantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptAsTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
