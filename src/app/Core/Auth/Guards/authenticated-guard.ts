import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(localStorage['socialToken'])
  {
    return router.parseUrl('/feed');
  }
  return true;
};
