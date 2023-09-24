import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {


  constructor(private categoryModifier :CategoryModifierService,private route: ActivatedRoute){}
  
  public itemsList: ChartItem[]=[];
  // public chartList: ChartItem[] = [new ChartItem("car","red",300), new ChartItem("electricity","blue",100)];


  public categories: string[]=[];

  
  ngOnInit(): void {
    this.itemsList= this.categoryModifier.itemsList;
    
    // this.route.data
    // .subscribe(
    //   (data: Data) => {
        
    //     this.itemsList= data['chartItems'];
    //     console.log(this.itemsList);       
    //   }
    // );

    this.categoryModifier.itemListEvent.subscribe((itemListEvent: ChartItem[]  ) => {
      this.itemsList= itemListEvent;
    console.log(this.itemsList);

    } )


    
    // this.categories= this.categoryModifier.categories;
  }


}
