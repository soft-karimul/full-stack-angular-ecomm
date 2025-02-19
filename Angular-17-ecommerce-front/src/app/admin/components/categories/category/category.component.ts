import { Component, OnInit } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryService } from '../../../services/category.service';
import { SubCategoryComponent } from '../sub-category/sub-category.component';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AddCategoryComponent,SubCategoryComponent,NgFor,JsonPipe,NgIf,AsyncPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {


  public categories:any[] = [];



  constructor(private categoryServices:CategoryService){

  }


  ngOnInit(): void {
   this.categoryServices.getCategory().subscribe({
    next:(data)=>{
   console.log(data);
   data.forEach((category:any)=>{
    console.log(category);
    this.categories.push(category)
   })
   console.log(this.categories);
    },
    error:(error)=>{
      console.log(error);
    },
    complete:()=>{
      console.log("complete");
    }
  })
  }



 

}
