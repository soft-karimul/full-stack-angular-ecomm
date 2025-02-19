import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';

export const authGuard: CanActivateFn = (route, state) => {

const Auth = inject(AuthapiService);
const router  = inject(Router);
if(Auth.isLogedin()){
  return true;
}else {
  router.navigate(['/']);
  return false;
}


};
