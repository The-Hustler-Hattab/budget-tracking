import { ChartItem } from "../model/ChartItem.model";
import { Chart } from "chart.js";


export class CategoryModifierService{

    public itemsList: ChartItem[] = [new ChartItem("car","red",300), new ChartItem("electricity","blue",100)];
    public chart: any;


    public changeCatgory(chartItemIndex: number, newCategoty: string){
        this.itemsList[chartItemIndex].category=newCategoty;
    }

    public changeColor(chartItemIndex: number, color: string){
        this.itemsList[chartItemIndex].color=color;

    }

    public changeCost(chartItemIndex: number, cost: number){
        this.itemsList[chartItemIndex].monthlyCost=cost;

    }

    public addNewCategory(chartItem: ChartItem){
        
        const newItem= new ChartItem(chartItem.category,chartItem.color,chartItem.monthlyCost)
        
        this.itemsList.push(newItem);

        console.log("items  "+this.itemsList);
        this.updateChart()
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
        console.log("[+] update chart");
        
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