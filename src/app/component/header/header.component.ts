import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';


import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { CategoryModifierService } from 'src/app/service/categoryModifier.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  


  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authService: OktaAuthStateService, 
  private http: HttpClient, private categoryModifierService: CategoryModifierService,
  private router: Router ) {
  }

  
  print(){
    let token = this.oktaAuth.getAccessToken()
    console.log(token)
  }

  login(){

    this.oktaAuth.signInWithRedirect();
    console.log("logged in");

    this.categoryModifierService.updateChart()

  }

  logout(){
    this.oktaAuth.signOut();
    console.log("logged out");

    // this.token.emit("")
  }




}
