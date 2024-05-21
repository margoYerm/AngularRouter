import { CanDeactivateFn, UrlTree } from "@angular/router";
import { CourseComponent } from "../courses/course/course.component";


export const ConfirmExitGuard: CanDeactivateFn<CourseComponent> = (
  component: CourseComponent) => {
  return component.confirmExit();
};

