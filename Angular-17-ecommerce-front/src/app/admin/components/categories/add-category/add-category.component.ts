import { Component, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AuthapiService } from '../../../services/authapi.service';
import { JsonPipe, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../../helpers/form-field-validation';
import { createCategoryType } from '../../../types/auth-type';
import { PopupService } from '../../../services/popup.service';
import { NgToastModule } from 'ng-angular-popup';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [JsonPipe,ReactiveFormsModule,NgIf,NgToastModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  public category:any[] = [];
  public btn_state:boolean = false;
  public formData = new FormData();
 public featured:boolean = false;

 @ViewChild(FormGroupDirective)
 private formDir!:FormGroupDirective;

constructor(
  private categoryServices:CategoryService,
  private fb:FormBuilder,
  private authapiService:AuthapiService,
  private popup:PopupService

){

}

categoryForm:FormGroup = this.fb.group({
  category:new FormControl<string>('',[Validators.required]),
  description:new FormControl<string>('',Validators.required),
  featured: new FormControl<boolean>(this.featured)
})

get category_val(){
  return this.categoryForm.get('category');
}
get description_val(){
  return this.categoryForm.get('description');
}


createNewCategory(event:Event){
  event.preventDefault();

  if(this.categoryForm.valid){
    if(this.formData.has('file')){
    this.categoryForm.patchValue({featured:this.featured});
     this.formData.append('category',this.categoryForm.value.category);

    this.categoryServices.uploadFile(this.formData).subscribe({
      next:(data:any)=>{
        console.log(data);
// create new category after file uploading 
this.btn_state = true;
console.log(this.categoryForm.value);
this.categoryServices.createCategory(this.categoryForm.value  as createCategoryType).subscribe({
 next:(data:any)=>{
   console.log(data);
   this.resetForm();
   this.btn_state = false;
 },
 error:(error)=>{
   console.log(error);
   this.btn_state = false;
if(Array.isArray(error.error.message)){
 this.popup.showError(error.error.message[0]);
 }else {
   this.popup.showError(error.error.message);
 }
 }
});
      },
      error:(error)=>{
        console.log(error);
      }
    })
   }else{
    this.popup.showError("Please upload image first !");
   }
  }else{
    ValidateForm.ValidateAllFormField(this.categoryForm);
  }
}




ngOnInit(){
}

ngAfterViewInit(){
 
}

// get category file
getFile(event:any){
  const file = event.target.files[0];
  this.formData = new FormData();
  this.formData.append('file',file);
 
}


getCheckbox(event:any){
  this.featured = event.target.checked;
}

resetForm(){
  this.formDir.resetForm();
}




}
