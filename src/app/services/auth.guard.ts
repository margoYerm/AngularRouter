import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthStore } from "./auth.store";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { map } from "rxjs/operators";

//http://localhost:4200/courses/angular-router-course
export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree>  => {    
    return checkIfAuthenticated();
  }


export const AuthGuardChild: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> => {
    return checkIfAuthenticated();
  };


const checkIfAuthenticated = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    map((isLoggedIn) => (isLoggedIn ? true : router.parseUrl("/login")))
  );
}