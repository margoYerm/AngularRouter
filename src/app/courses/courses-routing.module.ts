import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './services/course.resolver';
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { lessonsResolver } from './services/lessons.resolver';
import { lessonDetailResolver } from './services/lesson-detail.resolver';
import { AuthGuard, AuthGuardChild } from '../services/auth.guard';
import { ConfirmExitGuard } from '../services/confirm-exit.guard';


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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuardChild],
    canDeactivate: [ConfirmExitGuard],
    children: [
      { //this component will be showed inside this Course component
        path: '', //http:localhost:4200/courses/router-in-depth
        component: LessonsListComponent,
        resolve: {
          //this lesson it’s data needed to the component
          lessons: lessonsResolver, 
        }
      },
      {//this component will be showed after click on lesson
        //http:localhost:4200/courses/router-in-depth/lessons/17
        path: 'lessons/:lessonSeqNo',
        component: LessonDetailComponent,
        resolve: {
          lesson: lessonDetailResolver,
        }
      },
    ],
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
