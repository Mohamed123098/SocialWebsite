import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentService } from './components/commentService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-commonent',
  imports: [DatePipe],
  templateUrl: './post-commonent.component.html',
  styleUrl: './post-commonent.component.css',
})
export class PostCommonentComponent implements OnInit {
@Input() postId:string="";
private readonly commentService = inject(CommentService);
comments!:CommentInterface[];
userAsString:string|null = localStorage.getItem('socialUser');
user = JSON.parse(this.userAsString!);
ngOnInit(): void {
  this.getComments();
  
}
getComments():void
{
  this.commentService.getComments(this.postId).subscribe({
    next:(res)=>{
      if(res.success)
      {
        this.comments=res.data.comments;
      }
    }
  })
}
}
