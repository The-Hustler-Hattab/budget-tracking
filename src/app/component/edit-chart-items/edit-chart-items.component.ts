import { Component, Input } from '@angular/core';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';

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


  constructor(private categoryModifierService: CategoryModifierService){
    
  }


  @Input()
  pieChartItem: ChartItem = new ChartItem("","",0);

  @Input() 
  id: number =0;



  deleteItem(){
    this.categoryModifierService.deleteItem(this.id);
    // this.categoryModifierService.
  }

  onUpdate(){

    this.categoryModifierService.changeCatgory(this.id , this.pieChartItem.category)
    this.categoryModifierService.changeColor(this.id , this.pieChartItem.color)
    this.categoryModifierService.changeCost(this.id , this.pieChartItem.monthlyCost)
  
  
  }
}
