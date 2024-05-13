import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantVisitorInfoDialogComponent } from './tenant-visitor-info-dialog.component';

describe('TenantVisitorInfoDialogComponent', () => {
  let component: TenantVisitorInfoDialogComponent;
  let fixture: ComponentFixture<TenantVisitorInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantVisitorInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantVisitorInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
