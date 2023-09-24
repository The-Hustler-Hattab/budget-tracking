import { ChartItem } from "../model/ChartItem.model";


export class FormValidtior{


    public static validateForm(item: ChartItem) : boolean {
        let isCategoryValid= true;
        let isCostValid= true;



        if (item.category.length<2) {
            isCategoryValid= false;
          }
          if(item.monthlyCost < 1 ){
            isCostValid= false;
      
          }
          if (!isCostValid || !isCategoryValid) {
            console.log("the form is incorrect")
            return true;
          }


        return false;
    }
}