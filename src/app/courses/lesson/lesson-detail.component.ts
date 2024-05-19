import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonDetail} from "../model/lesson-detail";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  /*With this way we use same instance of component, but different data*/
  lesson$: Observable<LessonDetail>;
  
  //With this way not working next and previous methods, because we using
  //the same lesson component and same data.
  //lesson: LessonDetail; //for lesson, static obj. 

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    console.log("Created LessonDetailComponent...");
  }

  ngOnInit() {
    /*Observable emit new data for this component all the time*/
    this.lesson$ = this.activatedRoute.data.pipe(
      map(data => data['lesson'])
    ) //Observable

    /*Snapshot emit just first value when a component was created*/
    //this.lesson = this.activatedRoute.snapshot.data['lesson']; //static obj
  }

  previous(lesson) {   
    // current http://localhost:4200/courses/angular-router-course/lessons/5
    //relative is http://localhost:4200/courses/angular-router-course
    this.router.navigate(
      //it's important *ngIf="!lesson.first"
      ['lessons', lesson.seqNo - 1], 
      {relativeTo: this.activatedRoute.parent}
    )
  }

  next(lesson) {
    this.router.navigate(
      //it's important *ngIf="!lesson.last"
      ['lessons', lesson.seqNo + 1], 
      {relativeTo: this.activatedRoute.parent}
    )
  }
}
