import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './component/chart/chart.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { CategoryModifierService } from './service/categoryModifier.service';

const routes: Routes = [
  {path: "budget" , component: ChartComponent },
  {path:"home", component: HomeComponent},
  {path:"",redirectTo: "home", pathMatch: 'full'},

  {path:"about", component: AboutComponent},
  {path: 'callback', component: OktaCallbackComponent},
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo:'page-not-found'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
