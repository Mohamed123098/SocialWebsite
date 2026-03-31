import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);
  private readonly header:object= {
    // headers:{
    //   Authorization:`Bearer ${localStorage.getItem('socialToken')}`
    // }
  };
  getComments(postId:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments?page=1&limit=10`)
  };
  createComment(postId:string,comment:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments?page=1&limit=10`,comment)
  }
}
