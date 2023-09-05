import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartItemValidatorComponent } from './chart-item-validator.component';

describe('ChartItemValidatorComponent', () => {
  let component: ChartItemValidatorComponent;
  let fixture: ComponentFixture<ChartItemValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartItemValidatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartItemValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
