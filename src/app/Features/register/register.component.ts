import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Auth } from '../../Core/Auth/Services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
private readonly authService = inject(Auth);
errorMessage : string="";
loading:boolean=false;
private readonly router = inject(Router);

registerForm:FormGroup=new FormGroup({
name : new FormControl("",[Validators.required]),
username:new FormControl("",[Validators.required]),
gender:new FormControl("",[Validators.required]),
email:new FormControl("",[Validators.required,Validators.email]),
dateOfBirth:new FormControl("",[Validators.required]),
password:new FormControl("",[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
rePassword:new FormControl("",Validators.required)
},
// {updateOn:"blur"}//blur الاخطاء هتظهر لما اطلع من المدخل
{updateOn:"change" ,validators:[this.confirmPassword]},
//change الاخطاء هتظهرمع اي تغيير في  المدخل
// {updateOn:"submit"}//submit الاخطاء هتظهر لما اعمل ارسال 

);

confirmPassword(group:AbstractControl)
{
  const password = group.get('password')?.value;
  const repassword = group.get('rePassword')?.value;
  if(password!==repassword)
  {
    group.get('rePassword')?.setErrors({mismatch:true});
    return {mismatch:true}
  }
  return null;
}



registerSubscription:Subscription = new Subscription();
submitForm()
{
  if(this.registerForm.valid)
  {
  this.registerSubscription.unsubscribe();//to prevent user to make server crach
   this.loading=true;//to run spinner
  this.registerSubscription  
  = this.authService.SignUp(this.registerForm.value).subscribe({
  next:(res)=>{
    if(res.success)
    {
      this.router.navigate(['/login'])
      //  console.log(this.registerForm.value);

    }
// navigator
  },
  error:(err:HttpErrorResponse)=> {
    this.errorMessage=err.error.message; //to get the error of the backend 
    this.loading=false;
  },
  complete:()=>{
    this.loading=false;
  }
  })
  }
  this.registerForm.markAllAsTouched();//to show errors when submit
};
// navigateToLogin():void{
//   this.router.navigate(['/login'])
// }
showPassword(pass:HTMLInputElement,icon:HTMLElement):void
{
 if(pass.type==='password')
 {
  icon.classList.remove('fa-eye-slash')
  icon.classList.add('fa-eye')
  pass.type='text'
 }
 else{
 icon.classList.remove('fa-eye')
  icon.classList.add('fa-eye-slash')
  pass.type='password'
 }
}
}
