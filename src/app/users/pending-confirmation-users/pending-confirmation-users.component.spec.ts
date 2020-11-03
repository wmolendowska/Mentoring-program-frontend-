import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingConfirmationUsersComponent } from './pending-confirmation-users.component';

describe('PendingConfirmationUsersComponent', () => {
  let component: PendingConfirmationUsersComponent;
  let fixture: ComponentFixture<PendingConfirmationUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingConfirmationUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingConfirmationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
