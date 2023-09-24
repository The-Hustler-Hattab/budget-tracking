import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';


import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { BudgetApiService } from 'src/app/service/budgetApiService.service';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  


  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authService: OktaAuthStateService, 
  private http: HttpClient, private categoryModifierService: CategoryModifierService, private tokenService: TokenService
  ,private router: Router ) {
  }

  
  print(){
    let token = this.oktaAuth.getAccessToken()
    console.log(token)
  }

  login(){

    this.oktaAuth.signInWithRedirect();
    console.log("logged in");
    this.tokenService.token.emit(this.oktaAuth.getAccessToken())

    this.categoryModifierService.updateChart()

  }

  logout(){
    this.tokenService.token.emit("")
    this.oktaAuth.signOut();
    console.log("logged out");



    
    // this.token.emit("")



  }




}
