import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvictAsTenantDialogComponent } from './evict-as-tenant-dialog.component';

describe('EvictAsTenantDialogComponent', () => {
  let component: EvictAsTenantDialogComponent;
  let fixture: ComponentFixture<EvictAsTenantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvictAsTenantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvictAsTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
