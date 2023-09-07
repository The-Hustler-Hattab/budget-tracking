import { Component } from '@angular/core';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {


  constructor(private categoryModifier :CategoryModifierService){}
  
  public itemsList: ChartItem[]=[];
  // public chartList: ChartItem[] = [new ChartItem("car","red",300), new ChartItem("electricity","blue",100)];


  public categories: string[]=[];

  
  ngOnInit(): void {
    this.itemsList= this.categoryModifier.itemsList;
    // this.categories= this.categoryModifier.categories;
  }


}
