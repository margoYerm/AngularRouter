import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './services/course.resolver';


const routes: Routes = [
  {
    //this rout will be showing with address http:localhost:4200/courses
    path: "",
    component: HomeComponent,
  }, {
    //will work when we click View course btn (course-card-list)
    //address http:localhost:4200/courses/${courseUrl}, each course has
    //property url
    path: ':courseUrl', //variable
    component: CourseComponent,
    //it indicate router that before display CourseComponent, fetch this 
    //data (course) using courseResolver
    resolve: {course: courseResolver}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class CoursesRoutingModule {}
