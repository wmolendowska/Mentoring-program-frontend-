import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedStudentsComponent } from './unassigned-students.component';

describe('UnassignedStudentsComponent', () => {
  let component: UnassignedStudentsComponent;
  let fixture: ComponentFixture<UnassignedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
