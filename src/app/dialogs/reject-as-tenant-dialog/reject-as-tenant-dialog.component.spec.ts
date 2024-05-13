import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectAsTenantDialogComponent } from './reject-as-tenant-dialog.component';

describe('RejectAsTenantDialogComponent', () => {
  let component: RejectAsTenantDialogComponent;
  let fixture: ComponentFixture<RejectAsTenantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectAsTenantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectAsTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
