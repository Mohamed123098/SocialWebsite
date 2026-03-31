import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './Features/login/login.component';
import { RegisterComponent } from './Features/register/register.component';
import { ChangePasswordComponent } from './Features/change-password/change-password.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { NotificationComponent } from './Features/notification/notification.component';
import { ForgetPasswordComponent } from './Features/forget-password/forget-password.component';
import { NotfoundComponent } from './Features/notfound/notfound.component';
import { FeedComponent } from './Features/feed/feed.component';
import { authGuard } from './Core/Auth/Guards/auth-guard';
import { authenticatedGuard } from './Core/Auth/Guards/authenticated-guard';
import { DetailsComponent } from './Features/details/details.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:"full"
    },
    {
        
        path: '', component: AuthLayoutComponent,canActivate:[authenticatedGuard],
        children: [
            { path: 'login', component: LoginComponent,title:'Login Page' },
            { path: 'register', component: RegisterComponent,title:'Register Page' },
            { path: 'forget', component: ForgetPasswordComponent ,title:'Forget Password Page'}
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,canActivate:[authGuard],
        children: [
            {
                path: 'profile', component: ProfileComponent,title:'Profile Page'
            },
            {
                path: 'notification', component: NotificationComponent,title:'Notification Page'
            },
            {
                path: 'change', component: ChangePasswordComponent,title: 'Change password Page'
            },
            {
                path:'feed',component:FeedComponent,title:'Feed Page'
            },
            {
                path:'details/:id',component:DetailsComponent,title:'Post Details page'
            }
        ]
    },
    {
        path:'**',component:NotfoundComponent,title:'Not Found Page'
    }
];
