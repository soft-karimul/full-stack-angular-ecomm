import { Routes } from '@angular/router';
import { LoginComponent } from './admin/components/login/login.component';
import { SignupComponent } from './admin/components/signup/signup.component';
import { LayoutComponent } from './admin/components/layout/layout.component';
import { HomeComponent } from './portal/home/home/home.component';
import { CategoryComponent } from './admin/components/categories/category/category.component';
import { OverviewComponent } from './admin/components/overview/overview.component';
import { authGuard } from './admin/guards/auth.guard';

export const routes: Routes = [

            {
             path:"",
             component:HomeComponent
            },
            {
                path:"login",
                component: LoginComponent
            },
            {
                path:'signup',
                component: SignupComponent
            },
            {
                path:'dashboard',
                component:LayoutComponent,
                canActivate:[authGuard],
                children: [
                    {
                        path:'',
                        component:OverviewComponent
                    },
                    {
                        path:"category",
                        component : CategoryComponent
                    }
                ]
            }
        
    
];
