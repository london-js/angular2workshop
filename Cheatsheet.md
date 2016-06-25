# Cheatsheet

The idea is to get you started quickly. A lot of these topics are covered in the demo you are given.

## Bindings

one way binding

```
{{}}
```



property binding, one way. This can be used on most html attributes but also on custom components

```
<div [class]="classProperty">
```



two way binding. Usually used when dealing with CRUD scenarios. This is also called banana binding due to its appearance.

```
<input [(ngModel)]="username" >
```



event/callback biding

```
<button (click)="save()">Save</button>
```



## Component

### Simple Component

Declaration

```
@Component({
  selector : 'custom',
  template : ``,   // or templateUrl
  directives : [  ]  // a list of custom child components that you use in this view
})
export class CustomComponent {
  
}
```

Usage:

```
<custom></custom>
```

### Component with bindable properties

Declaration

```
@Component({
  selector : 'custom',
  template : ``,
  
})
export class CustomComponent { 
  @Input prop
}
```

Usage:

```
<custom [prop]="user"></custom>
```

## Routing - deprecated

#### setup

So what do you need for routing to work. First off we need to add a tag to header

```
// index.html
<head>
    <base href="/">
```

Secondly we need to setup the routes

```
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


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
     ROUTER_PROVIDERS,
     HTTP_PROVIDERS,
     EmpireService,
     UserService,
     PlanetsService,
     BaseClient
   ]
})
@RouteConfig([
  {
    path: '/rebels',
    name: 'RebelAlliance',
    component: RebelAllianceComponent,
  },
  {
    path: '/empire',
    name: 'Empire',
    component: EmpireComponent
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeComponent
  },
  {
      path: '/login',
      name: 'Login',
      component : LoginComponent
  }
])
export class AppComponent{
  
}
```

We did several things here

1 add ROUTER_DIRECTIVES to directive

2 add ROUTER_PROVIDERS to providers

3 adding <router-outlet> to template, this is where your views gets rendered

4 Adding @RouteConfig annotation to define our routes. New routes are easily added by adding an entry to the array.

#### list routing

A simple way to build a list of things is to use the ngFor directive and simply list all items in an array. 

```
<div *ngFor="let item of items">
	<<a [router-link]="['Detail', {id: item.id}]">
          {{ item.name }}
        </a>         
</div> 
```

This is enough to create a list. However we want to be able to click one of the items and be taken to a detail page.

#### detail page

First thing we need is a route entry in our router dictionary

```
// detail page
import { RouteParams } from '@angular/router-deprecated';
import { Component, OnInit } from '@angular/core';

@Component({
  selector : 'detail',
  template : ` 
     {{ data?.name }}
  `
})
export class DetailComponent {
  data:any;

  constructor(
    private service: Service,
    private routeParams: RouteParams
  ) {
      let id = this.routeParams.get('id');
      this.service.getDataById( id )
                  .subscribe( data => this.data ) 
  }
}
```



### Routing - new new router

In the last few days a new router just arrived. There are some differences most in the setup of the project. 



## New router

Angular comes with old router and to use the new one, also called Vladivostok we first need to uninstall the old one and then install the new one.

```
npm remove @angular/router --save // will remove the RC router
npm install @angular/router@3.0.0-alpha.7 --save // will install the latest router

```

### Changes to system.config.js

Add the following entry to packages:

```
'@angular/router': { main: 'index.js', defaultExtension: 'js' }

```

And remove the **router** entry from **ngPackageNames**.

### Registering routes and bootstrapping

After that you need to change all import references to point to @angular/router instead of the deprecated one.

It differs somewhat how we set up the routes.

We will do the setup in main.ts. But first we to remove the @RouteConfig and create an app.routes.ts file looking like this.

```
import { provideRouter } from '@angular/router';

import { ListComponent } from './components/component.list';
import { DetailComponent } from './components/component.detail';

export const routes: RouterConfig = [
{
    path: 'components',

    component: ListComponent,
},
{
    path: 'components/:id',

    component: DetailComponent,
}];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

```

Note that all name properties are gone and that all of our paths does NOT start with /

I mentioned main.ts, this is how it turns out

```
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

import { APP_ROUTER_PROVIDERS } from './app.routes';



bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS
])
.catch(err => console.error(err));

```

As you can see we just import APP_ROUTER_PROVIDERS and add them as the second argument to bootstrap.

### Changing the links

We used to build the links like so:

```
<a [routerLink]="['Home']">Home</a> 

```

I.e we used to look at the name property that we registered a route entry with. As the name property is no more we need to rely on the path property instead like so:

```
<a [routerLink]="['/home']">Home</a> 

```

Also for routes with parameter a little has happened. It used to be

```
<a [routerLink]="['/products', { id : product.id } ]">Detail</a>

```

Now it is

```
<a [routerLink]="['/products', product.id ]">Detail</a>
```

And lastly in the detail componet we grab our parameter by doing so

```
// detail.component.ts
class DetailComponent implements OnInit {
   constructor( private productService:ProductService ){
  
   }

   ngOnInit(){
        var me = this;
        this.id = this.route.params.subscribe(params => {
            let id = params['id']; // (+) converts string 'id' to a number
            me.id = id;
            this.productsService.getProduct( me.id ).subscribe( product =>    this.product = product );
        });
        
       
    }
}
    
```

## Dependency injection

Declaring a service

```
import { Injectable } from '@angular/core';

@Injectables
export class Service {
  doStuff(){}
}

```

Consuming it. We need to declare it as a provider if the angular app is gonna be able to make it part of its own DI system and create a singleton from it, providing of course we want it to be a singleton and we want to maintain state in it. So first off lets make angular aware of this service. 

```
// app.component.ts
import { Service } from 'services/service';

@Component({
  selector : 'app',
  providers : [ Service ]
})
```

NOTE we need to place this at the highest possible component for it to be avilable everywhere. Only register it as someone's provider once or you will have a bunch of instances registered and you have to remember which one you are using.

## Pub/ sub

Communication between components/ services is something that is easiest achieved by using observers and topics. We basically have a subject that exposes an observable that we can subscribe to. Let's look at a service doing just that

```
// user.service.ts
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
```

Let's highlight the important parts.

1 importing Subject and Observable

2 declaring a field of type Subject and initialize it

```
loggedInUserSubject:Subject<User>;

constructor() {
   this.loggedInUserSubject = <Subject<User>>new Subject();
}
```

3 expose the subject as an import

```
getUser():Observable<User> {
        return this.loggedInUserSubject.asObservable();
    }
```

4 expose a method that triggers a publish

```
setUser( user:User ) {
  this.user = user;
  this.loggedInUserSubject.next( user );
}
```

And lastly we need some component to consume this by setting up a subscribe

Imagine a scenario where you are standing on a route meant for admin and suddenly someone switches to a normal user that shouldn't see this route. By declaring this code you can route user to  the login page.

```
ngOnInit() {
        
        this.userService.getUser().subscribe(user => {
           var found = user.roles.find( x => x == 'Administrator' );
           if(!found) {
               //route to home
               this.router.navigate(['/Login',{}]);
           }
          
        });
```
