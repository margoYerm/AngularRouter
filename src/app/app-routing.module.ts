import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '', //this is home page witch redirect user to another route 
    redirectTo: '/courses',
    pathMatch: 'full' // it's means  address === path (https://domen)
  },{
    path: "courses", //courses/angular-router-course/17     
    //this is asynchronous operation, which is a function without args
    //and it will return a Promis witch contains a series of child routes
    loadChildren: 
      //import is Promise that return us file, In then we take this file 
      //and load CoursesModule 
      () => import('./courses/courses.module').then(m => m.CoursesModule) 
  },{
    path: 'login', // part of url
    component: LoginComponent, //component that we showing on this path
  }, {
    path: 'about',
    component: AboutComponent,
  },
  {
    //** match with all path, so it should be at the end and will use 
    //when not matches with previous paths
    path: '**', 
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    //This function for setup router 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [

  ]
})
export class AppRoutingModule {


}
