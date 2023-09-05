import { Component } from '@angular/core';
import { ChartItem } from 'src/app/model/ChartItem.model';

@Component({
  selector: 'app-edit-chart-items',
  templateUrl: './edit-chart-items.component.html',
  styleUrls: ['./edit-chart-items.component.css']
})
export class EditChartItemsComponent {
  formData: ChartItem = {
    category: '',
    color: '',
    monthlyCost: 0,

  };

  onUpdate(){}
}
