import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { initFlowbite } from 'flowbite';
import { Auth } from '../../Core/Auth/Services/auth';
import { Search } from '../../Shared/search';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit,OnChanges{
  text:string="";
ngOnChanges(changes: SimpleChanges): void {
  this.search.sendData(this.text)
}
ngOnInit(): void {
  initFlowbite()
}
private readonly authService = inject(Auth)

private readonly search= inject(Search)
userAsString:any = localStorage.getItem('socialUser');
user:any = JSON.parse(this.userAsString);
SignOut():void{
this.authService.SignOut();
}
}
