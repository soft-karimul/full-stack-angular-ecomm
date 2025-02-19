import { Component, Input, SimpleChange, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { AuthapiService } from '../../../services/authapi.service';
import { PopupService } from '../../../services/popup.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import ValidateForm from '../../../helpers/form-field-validation';
import { updateCategoryType } from '../../../types/auth-type';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [NgIf,NgToastModule,ReactiveFormsModule,NgFor,JsonPipe],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent {

 
  public btn_state:boolean = false;
  public categories:any[] = [];
  
  @Input() sendCategory!:any[];
  @ViewChild(FormGroupDirective)
  private formDir!:FormGroupDirective;
 

constructor(
  
  private categoryServices:CategoryService,
  private fb:FormBuilder,
  private authapiService:AuthapiService,
  private popup:PopupService
){
 
}

ngOnChanges(changes:SimpleChange){
  console.log(this.sendCategory) 
}

subCategoryForm:FormGroup = this.fb.group({
  maincategory:new FormControl<string>('',[Validators.required]),
  subcategory:new FormControl<string>('',Validators.required),
})

get category_val(){
  return this.subCategoryForm.get('category');
}
get sub_category_val(){
  return this.subCategoryForm.get('subCategory');
}

createNewSubCategory(event:Event){
 
event.preventDefault();
this.btn_state = true;
console.log(this.subCategoryForm.value)
if(this.subCategoryForm.valid){
  this.categoryServices.updateCategory(this.subCategoryForm.value as updateCategoryType).subscribe({
    next:(data)=>{
    console.log(data)
    this.btn_state = false;
    },
    error:(error)=>{
      this.btn_state = false;
     console.log(error);
    }
  });
}else{
  ValidateForm.ValidateAllFormField(this.subCategoryForm);
}
}



ngOnInit(): void {
 this.categoryServices.getCategory().subscribe({
  next:(data)=>{
 console.log(data);
 data.forEach((category:any)=>{
  this.categories.push(category)
 })
  },
  error:(error)=>{
    console.log(error);
  },
  complete:()=>{
    // console.log("complete");
  }
})
}


resetForm(){
  this.formDir.resetForm();
}




}
