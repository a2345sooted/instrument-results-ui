import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunConfiguration } from './run-configuration';

describe('RunConfiguration', () => {
  let component: RunConfiguration;
  let fixture: ComponentFixture<RunConfiguration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunConfiguration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunConfiguration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
