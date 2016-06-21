## Installation

    npm install
    npm run typings install

## API
Have a look at the API to see what kind of data you can fetch

    www.swapi.com  
    
## Running

    npm start
    
## Task

- Provide a detail link and page for a person ( on the empire page )
- Provide a detail link and page for a planet ( on the empire page )
- Ensure we can assign troops to planets. 
- Show a list of vehicles that can be assigned to a planet. ( on the empire page )
- Ensure we can assign vehicles to planets
- Ensure we can attack a planet when rules are fulfilled, see Rules section

### Extra (Optional) 


Filter if possible so that only rebel people and rebel vehicles are shown under each
chosen side

Add two users. Admin and Normal. Admin should be able to assign people/vehicle to
a planet. A user is a person in the list of people from the API, e.g Luke Skywalker. They should only be able to see what planet
they are assigned to.


### Rules
When we have enough troops assigned to a planet we can commence an attack


3 people or 2 people and one vehicle or 2 vehicles are enough to attack a planet.
Anything less means we are not ready to attack

Provide an attack button when conditions are met.


## Solving the task
It's up to you if you want to use this code skeleton, copy paste from angular.io or scaffold one with angular-cli
Its up to you wether to use the deprecated router or the new new alpha router

## New router
### Installation

Angular comes with old router and to use the new one, also called Vladivostok we first need to uninstall the old one and then install the new one.

    npm remove @angular/router --save // will remove the RC router
    npm install @angular/router@3.0.0-alpha.7 --save // will install the latest router


### Changes to system.config.js

Add the following entry to packages:

    '@angular/router': { main: 'index.js', defaultExtension: 'js' }
    
And remove the **router** entry from **ngPackageNames**.   
    
### Registering routes and bootstrapping
After that you need to change all import references to point to @angular/router instead of the deprecated one.
 
It differs somewhat how we set up the routes.
 
 We will do the setup in main.ts. But first we to remove the @RouteConfig and create an app.routes.ts file looking like this.
    
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

 Note that all name properties are gone and that all of our paths does NOT start with /
    
 I mentioned main.ts, this is how it turns out
 
    import { bootstrap }    from '@angular/platform-browser-dynamic';
    import { AppComponent } from './app.component';

    import { APP_ROUTER_PROVIDERS } from './app.routes';



    bootstrap(AppComponent, [
        APP_ROUTER_PROVIDERS
    ])
    .catch(err => console.error(err));

As you can see we just import APP_ROUTER_PROVIDERS and add them as the second argument to bootstrap. 

### Changing the links
We used to build the links like so:

    <a [routerLink]="['Home']">Home</a> 
    
I.e we used to look at the name property that we registered a route entry with. As the name property is no more we need to rely on the path property instead like so:    
    
    <a [routerLink]="['/home']">Home</a> 

Also for routes with parameter a little has happened. It used to be

    <a [routerLink]="['/products', { id : product.id } ]">Detail</a>

Now it is

    <a [routerLink]="['/products', product.id ]">Detail</a>
        

            