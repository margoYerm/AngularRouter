import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CoursesService } from "./courses.service";
import { Course } from "../model/course";


/*this router will fetch an instance of the Course
ActivatedRouteSnapshot - router obj, that contains info witch route is active (courses route)
RouterStateSnapshot - obj, that contains info about current state of the router*/
export const courseResolver: ResolveFn <Course> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  //when we have http:localhost:4200/courses/some-unique-url we can extract
  //some-unique-url from the browser address bar by using ActivatedRouteSnapshot
  //paramMap contains all the parts of url, and in our case this url contains only
  //one variable (we define this in routes -> path) 
  const courseUrl = route.paramMap.get('courseUrl');
  return inject(CoursesService).loadCourseByUrl(courseUrl); // this return Observable. So if we want add some additional logic, we can add .pipe (logic)
};