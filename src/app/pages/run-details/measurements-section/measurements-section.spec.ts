import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsSection } from './measurements-section';

describe('MeasurementsSection', () => {
  let component: MeasurementsSection;
  let fixture: ComponentFixture<MeasurementsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
