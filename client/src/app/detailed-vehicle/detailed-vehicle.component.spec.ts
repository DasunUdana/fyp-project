import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedVehicleComponent } from './detailed-vehicle.component';

describe('DetailedVehicleComponent', () => {
  let component: DetailedVehicleComponent;
  let fixture: ComponentFixture<DetailedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
