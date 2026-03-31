import { Component } from '@angular/core';
import { LeftSideBarComponent } from './Components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './Components/right-side-bar/right-side-bar.component';
import { FeedContentComponent } from './Components/feed-content/feed-content.component';

@Component({
  selector: 'app-feed',
  imports: [LeftSideBarComponent,RightSideBarComponent,FeedContentComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
userName:any=localStorage.getItem('socialUser');
user:any=JSON.parse(this.userName);
}
