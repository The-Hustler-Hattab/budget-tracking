import { Component, Input } from '@angular/core';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';

@Component({
  selector: 'app-edit-chart-items',
  templateUrl: './edit-chart-items.component.html',
  styleUrls: ['./edit-chart-items.component.css']
})
export class EditChartItemsComponent {


  isCategoryValid: boolean =true;

  isCostValid: boolean= true;


  constructor(private categoryModifierService: CategoryModifierService){
    
  }


  @Input()
  pieChartItem: ChartItem = new ChartItem(0,"","",0);

  @Input() 
  id: number =0;



  deleteItem(){
    this.categoryModifierService.deleteItem(this.id);
    // this.categoryModifierService.
  }

  onUpdate(){
    this.isCategoryValid= true
    this.isCostValid= true

    console.log(this.pieChartItem);
    
    if (this.pieChartItem.category.length<2) {
      this.isCategoryValid= false;
    }
    if(this.pieChartItem.monthlyCost < 1 ){
      this.isCostValid= false;

    }
    if (!this.isCostValid || !this.isCategoryValid) {
      console.log("the form is incorrect")
      return
    }

    this.categoryModifierService.updateItem(this.id, this.pieChartItem.category,  this.pieChartItem.color, this.pieChartItem.monthlyCost)
    // this.categoryModifierService.changeCatgory(this.id , this.pieChartItem.category)
    // this.categoryModifierService.changeColor(this.id , this.pieChartItem.color)
    // this.categoryModifierService.changeCost(this.id , this.pieChartItem.monthlyCost)
  
  
  }
}
