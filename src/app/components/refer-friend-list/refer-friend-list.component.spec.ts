import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferFriendListComponent } from './refer-friend-list.component';

describe('ReferFriendListComponent', () => {
  let component: ReferFriendListComponent;
  let fixture: ComponentFixture<ReferFriendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferFriendListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
