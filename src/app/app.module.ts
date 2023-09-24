import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { PieChartComponent } from './component/pie-chart/pie-chart.component';
import { CategoryModifierService } from './service/categoryModifier.service';
import { AddChartItemComponent } from './component/pie-chart/add-chart-item/add-chart-item.component';
import { FormsModule } from '@angular/forms';
import { EditChartItemsComponent } from './component/edit-chart-items/edit-chart-items.component';
import { ChartItemValidatorComponent } from './component/chart-item-validator/chart-item-validator.component';
import { ChartComponent } from './component/chart/chart.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthRoutingModule } from './auth-routing.module';
import { BudgetApiService } from './service/budgetApiService.service';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PieChartComponent,
    AddChartItemComponent,
    EditChartItemsComponent,
    ChartItemValidatorComponent,
    ChartComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AuthRoutingModule
  ],
  providers: [
    CategoryModifierService,
    BudgetApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
