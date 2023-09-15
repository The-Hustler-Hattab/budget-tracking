import { EventEmitter, Injectable } from "@angular/core";
import { ChartItem } from "../model/ChartItem.model";
import { Chart } from "chart.js";
import { BudgetApiService } from "./budgetApiService.service";

@Injectable()
export class CategoryModifierService{

    public itemsList: ChartItem[] = [new ChartItem(0,"car","#ec2222",300), new ChartItem(0,"electricity","#1100ff",100)];
    // public itemsList: ChartItem[] = [];

    public chart: any;

    public totalMonthlyCost: Number= 0;
    
    totalCostEvent: EventEmitter<Number> = new EventEmitter<Number>();
    itemListEvent: EventEmitter< ChartItem[]> = new EventEmitter< ChartItem[]>();
    
    constructor(private apiService: BudgetApiService){

        apiService.getAllBudgetRecords().subscribe((data: ChartItem[]) => {
          this.itemsList=data;

          console.log(data)
          this.itemListEvent.emit(this.itemsList)

          this.updateChart()
          this.calaculateMonthlyCost();



        })



    }

    public calaculateMonthlyCost(){        
        const numbersList: number[] = this.itemsList.map(item => item.monthlyCost);
        // add up the entire list
        this.totalMonthlyCost=numbersList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        this.totalCostEvent.emit(this.totalMonthlyCost)
        
        
    }



    public deleteItem(chartItemIndex: number){
        this.itemsList.splice(chartItemIndex,1)
        this.updateChart()
        this.calaculateMonthlyCost()
        
    }

    public updateItem(chartItemIndex: number, newCategoty: string, color: string, cost: number){
        this.itemsList[chartItemIndex].category=newCategoty;
        this.itemsList[chartItemIndex].color=color;
        this.itemsList[chartItemIndex].monthlyCost=cost;

        this.updateChart()
        this.calaculateMonthlyCost()
    }


    public addNewCategory(chartItem: ChartItem){
        
        const newItem= new ChartItem(0,chartItem.category,chartItem.color,chartItem.monthlyCost)

        this.itemsList.push(newItem);

        console.log("items  "+this.itemsList);
        this.updateChart()
        this.calaculateMonthlyCost()

    }

    private getItemsByType(property:string): any{
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
            labels: this.getItemsByType("categories"),
               datasets: [{
        label: 'Cost',
        data: this.getItemsByType("cost"),
        backgroundColor: this.getItemsByType("colors"),
        hoverOffset: 10
      }],
          },
          options: {
            aspectRatio:4
          }
    
        });
      }

    private updateChart() {
        
        if (this.chart) {
          // Update chart data and labels
          this.chart.data.labels = this.getItemsByType("categories");
          this.chart.data.datasets[0].data = this.getItemsByType("cost");
          this.chart.data.datasets[0].backgroundColor = this.getItemsByType("colors");
          this.chart.update();
        } else {
          this.createChart();
        }
      }

}