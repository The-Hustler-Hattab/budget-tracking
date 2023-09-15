import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './component/chart/chart.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  {path: "", component: ChartComponent},
  {path:"home", component: HomeComponent},
  {path:"about", component: AboutComponent},
  {
    path: 'callback',
    component: OktaCallbackComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
