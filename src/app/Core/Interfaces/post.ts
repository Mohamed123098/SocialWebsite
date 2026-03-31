import { User } from "./user";

export interface Post {
    _id:string;
    body:string;
    privacy:string;
    user:User;
    sharedPost:Post;
    likes:string[];
    createdAt:Date;
    commentsCount:number;
    topComment:string;
    sharesCount:number;
    likesCount:number;
    isShare:boolean;
    id:string;
    bookmarked:boolean;
    followers:number;
    image:string;
}