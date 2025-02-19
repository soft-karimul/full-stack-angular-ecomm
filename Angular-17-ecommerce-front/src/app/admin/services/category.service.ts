import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createCategoryType, updateCategoryType } from '../types/auth-type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  private url:string = 'http://localhost:3000/';


  createCategory(categoryForm:createCategoryType):Observable<any> {
   return this.http.post(this.url+'category',categoryForm);
  }

  updateCategory(updateCategory:updateCategoryType):Observable<any> {
    return this.http.put(this.url+'category',updateCategory);
   }


  getCategory():Observable<any>{
    return this.http.get(this.url+'category');
  }

  uploadFile(file:any){
    return this.http.post(this.url+'category/upload',file);
  }

}
