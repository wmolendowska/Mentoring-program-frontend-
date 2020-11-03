import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingsComponent } from './add-meetings.component';

describe('AddMeetingsComponent', () => {
  let component: AddMeetingsComponent;
  let fixture: ComponentFixture<AddMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
