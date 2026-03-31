import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const tostrService = inject(ToastrService)
  
  return next(req).pipe(
    catchError((err)=>{
      tostrService.error(err.error.message)
      return throwError(()=>err)
    })
  )
};
