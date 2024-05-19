import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { CoursesService } from "./courses.service";
import { inject } from "@angular/core";


export const lessonDetailResolver: ResolveFn <LessonDetail> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  /*when we have http:localhost:4200/courses/some-unique-url/SeqNo we can extract
  some-unique-url and lessonSeqNo from the browser address bar by using
  ActivatedRouteSnapshot paramMap contains all the parts of url,
  and this variables (we define this in routes -> path) */
  const courseUrl = route.parent.paramMap.get('courseUrl'); //from parent route
  const lessonSeqNo = route.paramMap.get('lessonSeqNo');
  return inject(CoursesService).loadLessonDetail(courseUrl, lessonSeqNo);
};