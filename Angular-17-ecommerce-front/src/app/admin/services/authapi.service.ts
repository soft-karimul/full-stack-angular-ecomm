import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, retry, tap } from 'rxjs';
import { LoginType, UserType } from '../types/auth-type';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

private url:string = 'http://localhost:3000/';
public readonly jwt_token:string = "JWT_TOKEN";
private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
private http = inject(HttpClient);
private logedinUser?:string;
private router = inject(Router);



  signup(data:UserType):Observable<unknown>{
  return  this.http.post<UserType>(this.url+"users/signup",data);
  }

  login(data:LoginType):Observable<any>{
    return this.http.post(this.url+'users/login',data).pipe(
      tap((tokens:any)=>{
        this.doLoginUser(data.email,tokens.token);
      })
    );
  }

  private doLoginUser(username:string,token:string){
    this.logedinUser = username;
    this.storeJwt(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwt(token:string){
      localStorage.setItem(this.jwt_token,token);
  }


  logout(){
    localStorage.removeItem(this.jwt_token);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLogedin():boolean{
  
      return !!localStorage.getItem(this.jwt_token);
   
  }

}
