import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCompComponent } from './accident-comp.component';

describe('AccidentCompComponent', () => {
  let component: AccidentCompComponent;
  let fixture: ComponentFixture<AccidentCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
