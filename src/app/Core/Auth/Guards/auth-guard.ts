import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  if(localStorage.getItem('socialToken'))
    {
      return true;
    }
    return router.parseUrl('/login')//to stop routing and go to login it is better than navigate
};
