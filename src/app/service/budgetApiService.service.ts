import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { ChartItem } from "../model/ChartItem.model";
import { OKTA_AUTH } from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";

export const  AppConstants = {
    BUDGET_API: "/v1/api/budget",
    
    GET_ALL_BUDGET_RECORDS : "/getSavedBudgetRecords",
    POST_SAVE_BUDGET_RECORD : "/saveBudgetRecord",
    PUT_BUDGET_RECORD : "/updateBudgetRecord",
    POST_DELETE_BUDGET_RECORD : "/deleteBudgetRecord",


}

@Injectable()
export class BudgetApiService {

    constructor(private http: HttpClient,@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {}

    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+this.oktaAuth.getAccessToken()
      });
      private apiUrl = environment.rooturl;
    
    
      getAllBudgetRecords(): Observable<ChartItem[]> {

        const url = `${this.apiUrl}`;


        const headers = this.headers;
            return this.http.get<{ statusCode: number; statusMessage: string; budgetModels: ChartItem[] }>
            ( url+ AppConstants.BUDGET_API+ AppConstants.GET_ALL_BUDGET_RECORDS,
            { headers } ).pipe(map(response => response.budgetModels));

      }

      saveBudgetRecord(newBudgetRecord: ChartItem) : Observable<ChartItem>{
        const headers = this.headers;
        const url = `${this.apiUrl}`;


        return this.http.post< {statusCode: number; statusMessage: string; budgetModel: ChartItem}>
        (url+ AppConstants.BUDGET_API+ AppConstants.POST_SAVE_BUDGET_RECORD
            , newBudgetRecord, { headers }).pipe(map(response => response.budgetModel));
      }

      deleteBudgetRecord(budgetRecordToDelete: ChartItem) : Observable<{statusCode: number; statusMessage: string}>{
        const url = `${this.apiUrl}`;
        const headers = this.headers;
        return this.http.post< {statusCode: number; statusMessage: string}>
        (url+ AppConstants.BUDGET_API+ AppConstants.POST_DELETE_BUDGET_RECORD
            , budgetRecordToDelete, { headers } );
      }

      
      updateBudgetRecord(updatedRecord: ChartItem) : Observable<{statusCode: number; statusMessage: string}>{
        const url = `${this.apiUrl}`;
        const headers = this.headers;
        return this.http.put< {statusCode: number; statusMessage: string;}>
            (url+ AppConstants.BUDGET_API+ AppConstants.PUT_BUDGET_RECORD
            , updatedRecord, { headers });
      }

    
}