import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentSection } from './instrument-section';

describe('InstrumentSection', () => {
  let component: InstrumentSection;
  let fixture: ComponentFixture<InstrumentSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
