import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})

//load fn will decide preload this module or not
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data['preload']) {
      return load();
    } else {
      // off() create a new observable
      of(null);
    }
  };
}