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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PieChartComponent,
    AddChartItemComponent,
    EditChartItemsComponent,
    ChartItemValidatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CategoryModifierService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
