import { Component, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartItem } from 'src/app/model/ChartItem.model';
import { CategoryModifierService } from 'src/app/service/categoryModifier.service';


@Component({
  selector: 'app-add-chart-item',
  templateUrl: './add-chart-item.component.html',
  styleUrls: ['./add-chart-item.component.css']
})

export class AddChartItemComponent {


  isCostValid    : boolean = true;
  isCategoryValid: boolean = true;

  
  constructor(private categoryModifierService : CategoryModifierService ){


  }
  
  formData: ChartItem = {
    id:0,
    category: '',
    color: '',
    monthlyCost: 0,

  }; // Initialize an object to store form data


  
  onSubmit() {
    this.isCostValid= true;
    this.isCategoryValid= true;
    
    console.log('Form Data:', this.formData);

    
    if (this.formData.category.length<2) {
      this.isCategoryValid= false;
    }
    if(this.formData.monthlyCost < 1 ){
      this.isCostValid= false;

    }
    if (!this.isCostValid || !this.isCategoryValid) {
      console.log("the form is incorrect")
      return
    }

    this.categoryModifierService.addNewCategory(this.formData)
  }

  clearForm(){
    this.formData = {
      id: 0,
      category:'',
      color: '',
      monthlyCost: 0
    };

  }
}
