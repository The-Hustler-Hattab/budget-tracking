import { Component, OnInit } from '@angular/core';
import { ChartItem } from './model/ChartItem.model';
import { CategoryModifierService } from './service/categoryModifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private categoryModifier :CategoryModifierService){}
  
  public itemsList: ChartItem[]=[];
  // public chartList: ChartItem[] = [new ChartItem("car","red",300), new ChartItem("electricity","blue",100)];


  public categories: string[]=[];

  
  ngOnInit(): void {
    this.itemsList= this.categoryModifier.itemsList;
    // this.categories= this.categoryModifier.categories;
  }



}
