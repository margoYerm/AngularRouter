import { CanMatchFn, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { AuthStore } from "./auth.store";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { first, tap } from "rxjs/operators";


export const CanMatchAuthGuard: CanMatchFn = (
  route: Route, segments: UrlSegment[]
  ): Observable<boolean | UrlTree> =>  {
    const auth = inject(AuthStore);
    const router = inject(Router);
    return auth.isLoggedIn$.pipe(
      first(),
      tap((loggedIn) => {if(!loggedIn) {
        router.navigateByUrl("/login")
      }})
    );
  }
