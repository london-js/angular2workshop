import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'login',
    template : `
    <div id="login">
        <div>
            <input type="text" [(value)]="username"  >
        </div> 
        <div>
            <input type="password" [(value)]="password"  >
        </div>    
        <div>
            <input type="submit" value="Login" (click)="login()" >
        </div>
    </div>
    `
})
export class LoginComponent {
    username:string;
    password:string;
    
    constructor(private router:Router) {
        this.username = '';
        this.password = '';
    }
    
    login() {
        // TODO call login service
        this.router.navigate(['/home', {}]);
    }
}