import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { ChartItem } from "../model/ChartItem.model";

export const  AppConstants = {
    BUDGET_API: "/v1/api/budget",
    
    GET_ALL_BUDGET_RECORDS : "/getSavedBudgetRecords",
    POST_SAVE_BUDGET_RECORD : "/saveBudgetRecord",
    PUT_BUDGET_RECORD : "/updateBudgetRecord",
    DELETE_BUDGET_RECORD : "/deleteBudgetRecord",


}

@Injectable()
export class BudgetApiService {

    constructor(private http: HttpClient) {}


    getAllBudgetRecords(): Observable<ChartItem[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
    
        return this.http.get<{ statusCode: number; statusMessage: string; budgetModels: ChartItem[] }>( environment.rooturl+ AppConstants.BUDGET_API+ AppConstants.GET_ALL_BUDGET_RECORDS,
            { headers } ).pipe(map(response => response.budgetModels));

      }

    
}