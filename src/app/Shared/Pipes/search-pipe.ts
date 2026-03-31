import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../Core/Interfaces/post';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data:Post[]):any[]
  {
    return data;
  }

}
