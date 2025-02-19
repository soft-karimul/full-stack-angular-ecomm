import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthapiService } from '../services/authapi.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const JWT_TOKEN = getJwtToken();
  if(JWT_TOKEN){
   const cloned =  req.clone({
      setHeaders:{
        Authorization:`Bearer ${JWT_TOKEN}`
      }
    })
    return next(cloned);
  }
  return next(req);
};


function getJwtToken():string | null {
  return "jk";
  // return localStorage.getItem(inject(AuthapiService).jwt_token)
}