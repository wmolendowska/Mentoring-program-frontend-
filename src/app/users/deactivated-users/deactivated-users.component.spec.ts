import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedUsersComponent } from './deactivated-users.component';

describe('DeactivatedUsersComponent', () => {
  let component: DeactivatedUsersComponent;
  let fixture: ComponentFixture<DeactivatedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
