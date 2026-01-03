import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRuns } from './view-runs';

describe('ViewRuns', () => {
  let component: ViewRuns;
  let fixture: ComponentFixture<ViewRuns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRuns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRuns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
