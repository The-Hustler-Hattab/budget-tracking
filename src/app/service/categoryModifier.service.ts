import { EventEmitter, Inject, Injectable } from "@angular/core";
import { ChartItem } from "../model/ChartItem.model";
import { Chart } from "chart.js";
import { BudgetApiService } from "./budgetApiService.service";
import OktaAuth from "@okta/okta-auth-js";
import { OKTA_AUTH } from "@okta/okta-angular";

@Injectable()
export class CategoryModifierService{
  public loggedOffItems: ChartItem[] = [new ChartItem(0,"car","#ec2222",300), new ChartItem(0,"electricity","#1100ff",100)];

    public itemsList: ChartItem[] = [];
    // public itemsList: ChartItem[] = [];

    public chart: any;

    public totalMonthlyCost: Number= 0;
    
    totalCostEvent: EventEmitter<Number> = new EventEmitter<Number>();
    itemListEvent: EventEmitter< ChartItem[]> = new EventEmitter< ChartItem[]>();
    
    constructor(private apiService: BudgetApiService, @Inject(OKTA_AUTH) public oktaAuth: OktaAuth ){
      this.getAllChartItemsFromServer();
      this.calaculateMonthlyCost();

    }


    public async getAllChartItemsFromServer(): Promise<ChartItem[]>{
      console.log("log in status "+(await this.oktaAuth.isAuthenticated()).valueOf());
      
      if(await this.oktaAuth.isAuthenticated().valueOf()){
        try {
          this.apiService.getAllBudgetRecords().subscribe((data: ChartItem[]) => {
            this.itemsList=data;
  
            // console.log(data)
            this.itemListEvent.emit(this.itemsList)
  
            this.updateChart()
            this.calaculateMonthlyCost();
            return this.itemsList
  
          })
    } catch (error) {
      console.error("error"+error);  
      this.itemsList= this.loggedOffItems.slice();
      this.itemListEvent.emit(this.itemsList)
      // this.updateChart()
      // this.calaculateMonthlyCost();
      return this.itemsList
  
    }
    }

      this.itemsList=this.loggedOffItems.slice();
      this.itemListEvent.emit(this.itemsList)
      // this.updateChart()
      // this.calaculateMonthlyCost();
      return this.loggedOffItems.slice();



  }

    public calaculateMonthlyCost(){        
        const numbersList: number[] = this.itemsList.map(item => item.monthlyCost);
        // add up the entire list
        this.totalMonthlyCost=numbersList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        this.totalCostEvent.emit(this.totalMonthlyCost)
        
        
    }



    public deleteItem(chartItemIndex: number){
      try {
      this.apiService.deleteBudgetRecord(this.itemsList[chartItemIndex])
      .subscribe((data: {statusCode: number; statusMessage: string}) => {
        
        console.log(": "+data)
        if (data.statusCode === 200) {
          console.log("[+] record deleted successfuly")
        }else{
          console.log("error occured while deleting record\nstatus code: "+data.statusCode);
          console.log("status message: "+data.statusMessage);
        }
      })
        
      } catch (error) {
        console.error(error)
        
      }

      this.itemsList.splice(chartItemIndex,1)  
      this.updateChart()
      this.calaculateMonthlyCost()
        
    }

    public updateItem(chartItemIndex: number, newCategoty: string, color: string, cost: number){
      const updatedChartRecord= new ChartItem(
        this.itemsList[chartItemIndex].id,this.itemsList[chartItemIndex].category,this.itemsList[chartItemIndex].color,
        this.itemsList[chartItemIndex].monthlyCost);  
      
      try {
        this.apiService.updateBudgetRecord(updatedChartRecord).subscribe((data: {statusCode: number; statusMessage: string}) => {
          
          console.log(": "+data)
          if (data.statusCode === 200) {
            console.log("[+] record updated successfuly")
          }else{
            console.error("error occured while updating record\nstatus code: "+data.statusCode);
            console.error("status message: "+data.statusMessage);
          }
        })
      } catch (error) {
        console.error(error)
  
      }

      this.itemsList[chartItemIndex]= updatedChartRecord;
      this.updateChart()
      this.calaculateMonthlyCost()
    }


    public addNewCategory(chartItem: ChartItem){
        
        let newItem= new ChartItem(0,chartItem.category,chartItem.color,chartItem.monthlyCost)
        
        try {
          this.apiService.saveBudgetRecord(newItem).subscribe((data: ChartItem) => {
            newItem=data;
          })
        } catch (error) {
          console.error(error)
        }
        this.itemsList.push(newItem);
        // console.log("items  "+this.itemsList);
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
        // console.log(catgories)
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

    public updateChart() {
        
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