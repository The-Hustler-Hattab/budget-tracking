import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartItemComponent } from './add-chart-item.component';

describe('AddChartItemComponent', () => {
  let component: AddChartItemComponent;
  let fixture: ComponentFixture<AddChartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
