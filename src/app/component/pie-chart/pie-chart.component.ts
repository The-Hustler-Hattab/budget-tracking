import {  Component } from '@angular/core';
import Chart from 'chart.js/auto';
import {ChartItem} from '../../model/ChartItem.model';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],

})

export class PieChartComponent{
  public totalMonthlyCost: Number= 0;

  public chart: any;
  public itemsList: ChartItem[] =[];
  
  constructor(private categoryModifier:CategoryModifierService, 

    ){}

  async ngOnInit(): Promise<void> {
    console.log("+"+this.itemsList);
    this.itemsList= await this.categoryModifier.getAllChartItemsFromServer()
    console.log("+"+this.itemsList);

    this.chart = this.categoryModifier.chart;
    this.categoryModifier.createChart()

    this.totalMonthlyCost= this.categoryModifier.totalMonthlyCost;

    this.categoryModifier.totalCostEvent.subscribe((totalCostnum: Number) => {
      this.totalMonthlyCost= totalCostnum;
    } )
  }





  getByItemType(property:string): any{
    let catgories = [];
    // Iterate through the objects and extract categories
    for (const item of this.itemsList) {
      
      if (property=="colors") {
      catgories.push(item.color)
      
      }else if (property=="categories") {
        catgories.push(item.category)

      }else if (property=="cost"){
        catgories.push(item.monthlyCost)
      }else{
        throw new Error("can not detirmne the list type");
        
      }
    }
    console.log(catgories)
    return catgories;
  }

  

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.getByItemType("categories"),
	       datasets: [{
    label: 'My First Dataset',
    data: this.getByItemType("cost"),
    backgroundColor: this.getByItemType("colors"),
    hoverOffset: 10
  }],
      },
      options: {
        aspectRatio:4
      }

    });
  }




}
