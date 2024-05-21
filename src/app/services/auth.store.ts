import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {map, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
//This is a store because we using here BehaviorSubject
export class AuthStore {
    //BehaviorSubject needs initial value and this subj keep 2 values 
    //(current and previous)
    private subject = new BehaviorSubject<User>(null);

    //to get info about state of user status we need inject AuthStore 
    //and subscribe to the user$
    user$ : Observable<User> = this.subject.asObservable(); 
    
    //2 Observables gives info about user state also for show login/logout btn
    isLoggedIn$ : Observable<boolean>;
    isLoggedOut$ : Observable<boolean>;

    //calling in startup time, before ngOnInit 
    constructor(private http: HttpClient) { //calling in startup time

        this.isLoggedIn$ = this.user$.pipe(map(user => !!user)); // Boolean(user)

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        const user = localStorage.getItem(AUTH_DATA);

        if (user) {
            this.subject.next(JSON.parse(user));
        }

    }

    login(email:string, password:string): Observable<User> {
        return this.http.post<User>("/api/login", {email, password})
            .pipe(
                tap(user => {
                    this.subject.next(user);
                    localStorage.setItem(AUTH_DATA, JSON.stringify(user));
                }),
                shareReplay()
            );
    }

    logout() {
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
    }
}
