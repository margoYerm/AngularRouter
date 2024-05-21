import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    course: Course;
    couponCode: string;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        //snapshot contains all information about current route
        //data contains all date for this component == resolve: {course: courseResolver}
        this. course = this.activatedRoute.snapshot.data["course"];
    }

    confirmExit() {        
        return confirm(
            `Are you sure that you want to exit ${this.course.description}?`
        );    
    }
}











