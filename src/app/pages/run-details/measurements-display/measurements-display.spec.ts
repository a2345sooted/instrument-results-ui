import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsDisplay } from './measurements-display';

describe('MeasurementsDisplay', () => {
  let component: MeasurementsDisplay;
  let fixture: ComponentFixture<MeasurementsDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementsDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementsDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
