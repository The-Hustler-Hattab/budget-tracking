import { Component, OnInit } from '@angular/core';
import { ChartItem } from './model/ChartItem.model';
import { CategoryModifierService } from './service/categoryModifier.service';
import { OAuthService,JwksValidationHandler  } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 


  
  ngOnInit(): void {
  }



}
