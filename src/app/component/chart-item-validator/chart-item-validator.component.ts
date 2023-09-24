import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-item-validator',
  templateUrl: './chart-item-validator.component.html',
  styleUrls: ['./chart-item-validator.component.css']
})
export class ChartItemValidatorComponent {
  
  @Input()
  isCostValid    : boolean = true;
  @Input()
  isCategoryValid: boolean = true;


}
