import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { EmpireService } from './components/empire/empire.service';
import { HTTP_PROVIDERS } from '@angular/http';
import './rxjs-operators';
import { UserService, User } from './components/shared/user.service';
import { BaseClient } from './components/shared/base-client.service';
import { PlanetsService } from './components/planets/planets.service';

@Component({
  selector: 'my-app',
  template: `
    <div class='center-container'>
       <h1>{{title}}</h1>
        <button (click)='setUser()' >Set user</button>
        <router-outlet></router-outlet>
    </div> 
    
  `,
   directives: [
       ROUTER_DIRECTIVES
   ],
   providers: [
    
     HTTP_PROVIDERS,
     EmpireService,
     UserService,
     PlanetsService,
     BaseClient
   ]
})

export class AppComponent implements OnInit  { 
    title:string;
    
    constructor(private router:Router, private userService:UserService) {
        this.title = 'Star Wars Battle planning system';
    }
    
    setUser() {
        var user = new User('Normal user','Normal');
       
        this.userService.setUser( user );
    }
    
    ngOnInit(){
        this.router.navigate(['/login', {}]);
    }
    
    
}