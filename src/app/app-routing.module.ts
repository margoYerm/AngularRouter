import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer, NoPreloading} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanMatchAuthGuard } from './services/can-match-auth.guard';
import { CustomPreloadingStrategy } from './services/custom-preloading.strategy';


const routes: Routes = [
  {
    path: '', //this is home page witch redirect user to another route 
    redirectTo: '/courses',
    pathMatch: 'full' // it's means  address === path (https://domen)
  },{
    path: "courses", //courses/angular-router-course/17     
    //this is asynchronous operation, which is a function without args
    //and it will return a Promise witch contains a series of child routes
    loadChildren: 
      //import is Promise that return us file, In then we take this file 
      //and load CoursesModule 
      () => import('./courses/courses.module').then(m => m.CoursesModule),
    canMatch: [CanMatchAuthGuard], //alternative for canLoad (not loaded before login)
    data: {
      preload: true, //or false if we don't want preload this module
    }
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
    RouterModule.forRoot(routes, {
      //preloadingStrategy: NoPreloading, //default value
      //preloadingStrategy: PreloadAllModules, // for all modules  
      preloadingStrategy: CustomPreloadingStrategy,    
    })
  ],
  exports: [RouterModule],
  providers: [
    CustomPreloadingStrategy,
  ]
})

export class AppRoutingModule {}
