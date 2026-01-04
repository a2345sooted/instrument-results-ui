import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunMoreInfoDialog } from './run-more-info-dialog';

describe('RunMoreInfoDialog', () => {
  let component: RunMoreInfoDialog;
  let fixture: ComponentFixture<RunMoreInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunMoreInfoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunMoreInfoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
