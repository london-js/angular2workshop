import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService { 
    loggedInUserSubject:Subject<User>;
    private user:User;
    
    constructor() {
        this.loggedInUserSubject = <Subject<User>>new Subject();
    }
    
    setUser( user:User ) {
        this.user = user;
        this.loggedInUserSubject.next( user );
    }
    
    getUser():Observable<User> {
        return this.loggedInUserSubject.asObservable();
    }
}

export class User{
    name:string;
    roles : Array<string>;
    
    constructor(name ='Default', ...roles) {
        this.roles = roles;
    }
}