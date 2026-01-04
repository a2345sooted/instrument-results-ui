import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSummary } from './run-summary';

describe('RunSummary', () => {
  let component: RunSummary;
  let fixture: ComponentFixture<RunSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
