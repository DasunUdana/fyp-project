import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationCompComponent } from './modification-comp.component';

describe('ModificationCompComponent', () => {
  let component: ModificationCompComponent;
  let fixture: ComponentFixture<ModificationCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
