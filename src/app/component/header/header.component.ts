import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';


import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { BudgetApiService } from 'src/app/service/budgetApiService.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authService: OktaAuthStateService, 
  private http: HttpClient, private apiService: BudgetApiService) {
  }

  public print(){
    let baseUrl = 'http://localhost:8070/v1/api/budget/hello'; // Replace with your API's base URL

    let charts: ChartItem[]= []
    this.apiService.getAllBudgetRecords().subscribe((data: ChartItem[]) => {
      // console.log(data)
      charts = data;
      return data;
    })

    // this.apiService.getAllBudgetRecords().subscribe((data: ChartItem[]) => {

    //   console.log(data)
    // })

    console.log(charts)



    // console.log( this.authService);
    // console.log( this.oktaAuth);
            

    //     this.http.get(baseUrl
    //       // , options
    //       ).subscribe(
    //       (response) => {

    //         console.log(response);
            
    //       }
    //         // do something with the response
    //     )
    
  }


}
