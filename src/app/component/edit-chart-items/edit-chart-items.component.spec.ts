import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChartItemsComponent } from './edit-chart-items.component';

describe('EditChartItemsComponent', () => {
  let component: EditChartItemsComponent;
  let fixture: ComponentFixture<EditChartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChartItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
