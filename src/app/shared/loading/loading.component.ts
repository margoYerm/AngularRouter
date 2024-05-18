import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from './loading.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input()
  routing: boolean = false;

  @Input() detectRoutingOnGoing: boolean = false;

  constructor(
    public loadingService: LoadingService,
    //To integrate this component with router
    private router: Router) {}

  ngOnInit() {
    if(this.detectRoutingOnGoing) {
      //detect a series of router events
      this.router.events
        .subscribe(
          event => {
            //navigation start (fetching some data)
            if(event instanceof NavigationStart || 
              event instanceof RouteConfigLoadStart) { //for add indicator to lazy load bundle
                this.loadingService.loadingOn();
            } 
            else if (
              //navigation finished successfully
              event instanceof NavigationEnd || 
              //finish broken navigation
              event instanceof NavigationError ||
              event instanceof NavigationCancel ||              
              event instanceof RouteConfigLoadEnd//lazy load finished
              ) {
                this.loadingService.loadingOff();
            }
          }
        );
    }
   
  }


}
