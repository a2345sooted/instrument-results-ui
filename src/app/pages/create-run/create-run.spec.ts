import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRun } from './create-run';

describe('CreateRun', () => {
  let component: CreateRun;
  let fixture: ComponentFixture<CreateRun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRun);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
