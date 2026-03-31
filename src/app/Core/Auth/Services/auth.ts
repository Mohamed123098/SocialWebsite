import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpCLient = inject(HttpClient);
  private readonly router = inject(Router);
  SignUp(data:object):Observable<any>
  {
    return this.httpCLient.post(`${environment.baseUrl}/users/signup`,data);
  }
  SignIn(data:object):Observable<any>
  {
    return this.httpCLient.post(`${environment.baseUrl}/users/signin`,data);
  }
  SignOut():void
  {
    localStorage.removeItem('socialToken')
    this.router.navigate(['/login'])
  }
}
