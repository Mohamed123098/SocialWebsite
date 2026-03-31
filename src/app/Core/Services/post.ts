import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient =inject(HttpClient);
  // private readonly header = {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('socialToken')}`,
  //   },
  // }


 getAllPosts():Observable<any>
 {
  return this.httpClient.get(`${environment.baseUrl}/posts`);
 }

 createPost(DataPost:object):Observable<any>
 {
  return this.httpClient.post(`${environment.baseUrl}/posts`,DataPost);
 }

 singlePost(postId:string):Observable<any>
 {
  return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`);
 }

  deletePost(postId:string):Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}`);

  }
  
}
