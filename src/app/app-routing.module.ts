import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {
    path: 'login', // part of url
    component: LoginComponent, //component that we showing on this path
  }, {
    path: 'about',
    component: AboutComponent,
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
