import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageDialogComponent } from './user-image-dialog.component';

describe('UserImageDialogComponent', () => {
  let component: UserImageDialogComponent;
  let fixture: ComponentFixture<UserImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
