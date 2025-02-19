import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http:HttpClient) { }

private url:string = 'http://localhost:3000/'

  post(endpoint:string,data:any){
    
  }



}
