import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import { Chart } from "chart.js";
import { CategoryModifierService } from "./categoryModifier.service";



@Injectable()
export class ChartModifierService implements OnInit{
    itemsList: any;
    public chart: any;
    
    constructor(private categoryModifier: CategoryModifierService){
        console.log("ChartModifierService");
        this.itemsList= this.categoryModifier.itemsList;

    }


    
    ngOnInit(): void {
    }

    getItemsByType(property:string): any{
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
        label: 'My First Dataset',
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

      updateEvents(data: string) {
        console.log("[+] updateEvents");
        
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