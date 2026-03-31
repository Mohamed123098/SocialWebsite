import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Search {
  data:string="";
  sendData(data:string):void
  {
    this.data = data;
  }
  recieveData():string
  {
    return this.data
    
  }
}
