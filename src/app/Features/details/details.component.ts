import { PostService } from './../../Core/Services/post';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../Core/Interfaces/post';
import { PostCommonentComponent } from "../feed/Components/feed-content/components/post-commonent/post-commonent.component";

@Component({
  selector: 'app-details',
  imports: [PostCommonentComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly postService = inject(PostService)
  userId = JSON.parse(localStorage.getItem('socialUser')!).id
  postId:string ="";
  
  postDetails!:Post;


  ngOnInit(): void {
    this.getPostId();
    this.getPostDetails();
  }

 
getPostId():void
  {
     this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.postId = res.get('id')!;
      }
    }) 
  }

  getPostDetails()
  {
    this.postService.singlePost(this.postId).subscribe({
      next:(res)=>{
        if(res.success)
        {console.log(res);}
        this.postDetails=res.data.post
      }
    });
  }
  deletePost():void{
    this.postService.deletePost(this.postId).subscribe({
      next:()=>{

      }
    })
  }
}
