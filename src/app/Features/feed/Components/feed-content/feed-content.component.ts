import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostService } from '../../../../Core/Services/post';
import { Post } from '../../../../Core/Interfaces/post';
import { User } from '../../../../Core/Interfaces/user';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { PostCommonentComponent } from "./components/post-commonent/post-commonent.component";
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { Search } from '../../../../Shared/search';
import { SearchPipe } from '../../../../Shared/Pipes/search-pipe';


@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, PostCommonentComponent, RouterLink,TimeAgoPipe,SearchPipe],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit,OnChanges{
  text:string="";
  ngOnChanges(changes: SimpleChanges): void {
    this.text = this.search.recieveData()
  }
  private readonly postService = inject(PostService)
  private readonly search = inject(Search)
  userId: string = "";
  user!: User;
  posts!: Post[];
  saveFile!: File;
  imgUrl!: string | ArrayBuffer | null | undefined
  filereader: FileReader = new FileReader()
  privacy: FormControl = new FormControl("public");
  body: FormControl = new FormControl("");
  loadingComments:boolean=false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('socialUser')!);
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)._id;
    this.getAllPosts();
  }
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.posts = res.data.posts;
        }
      }
    })
  }
  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        console.log(res)
        if(res.success)
        { this.getAllPosts();}
      }
    })
   
  }
  changeImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.saveFile = input.files[0]
    }
    //read file
    this.filereader.readAsDataURL(this.saveFile); //read file 
    this.filereader.onload = ((e) => {
      this.imgUrl = e.target?.result
    })
  }
  removeImg(): void {
    this.imgUrl = "";
    this.saveFile = undefined as any;
  }
  submitForm(e: Event,form:HTMLFormElement): void {
    e.preventDefault();
    const formData = new FormData();
    if (this.privacy.value) {
      // console.log(this.privacy.value);
      formData.append('privacy',this.privacy.value);
    }
    if (this.body.value) {
      // console.log(this.content.value);
      formData.append('body',this.body.value);
    }
    if (this.saveFile instanceof File)
      {
      // console.log(this.saveFile);
      formData.append('image',this.saveFile);
       }
      this.postService.createPost(formData).subscribe({
        next:(res)=>{
          if(res.success)
          {
            this.imgUrl="";
            this.saveFile=undefined as any
             form.reset();
            this.getAllPosts();
          }
        }
      })
    }
    getComments():void
    {
      this.loadingComments=true;
    }
  }

