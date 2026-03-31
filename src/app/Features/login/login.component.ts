import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Core/Auth/Services/auth';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
loginForm:FormGroup=new FormGroup({
  email:new FormControl("",[Validators.email]),
  password:new FormControl("")
},
{
  updateOn:"submit"
}
);

private readonly router = inject(Router);
errorMessage :string="";
private readonly authService =inject(Auth);
loginSubscription : Subscription=new Subscription();

loginSubmit():void
{
  if(this.loginForm.valid)
  {
    this.loginSubscription.unsubscribe();
    this.loginSubscription = this.authService.SignIn(this.loginForm.value).subscribe({
      next:(res)=>{
        if(res.success)
        {
        localStorage['socialToken']=res.data.token;
        localStorage['socialUser']= JSON.stringify(res.data.user);


          this.router.navigate(['/feed']);

        }
      },
      error:(err)=>{
      this.errorMessage =  err.error.message;
      },
      complete:()=>{
      }
    })
  }
  this.loginForm.markAllAsTouched();
}
// registerPage():void
// {
//   this.router.navigate(['/register'])

// }
}
