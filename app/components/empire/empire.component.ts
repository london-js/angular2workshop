import { Component, OnInit } from '@angular/core';
import { EmpireService } from './empire.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Villain } from '../shared/models';
import { PlanetsComponent } from '../planets/planets.component';

@Component({
  selector: 'empire',
  template: `
   <div id='empire'>
    <h2>Empire</h2>
    <div class='data-row' *ngFor="let villain of villains; let i = index">
       {{ villain.name }} {{ villain.assignedPlanet }}  <span class='assign' [hidden]='villain.assignedPlanet' (click)='assign(villain)'>assign</span> <a [routerLink]="['/empire', i +1 ]">Detail</a> 
    </div> 
    <planets></planets>
    <div>
        <a [routerLink]="['/home']">Home</a> 
    </div>
   </div>
  `,
  directives: [
    ROUTER_DIRECTIVES,
    PlanetsComponent
  ]
})
export class EmpireComponent implements OnInit {
    villains:Array<Villain>;
    
    constructor(
        private empireService:EmpireService, 
        private userService:UserService, 
        private router:Router 
    ) {
        
    }
    
    ngOnInit() {
        
        this.userService.getUser().subscribe(user => {
           var found = user.roles.find( x => x == 'Administrator' );
           if(!found) {
               //route to home
               this.router.navigate(['/Login',{}]);
           }
           console.log('new user');
           // if user has changed, either stay or route from here 
        });
        
        this.empireService.getVillainsFromApi()
        .subscribe( villains  => {
            this.villains = villains;
        }, error => {
            console.log(error);
        })
    }
    
    assign(villain:Villain){
        // open modal
        console.log( villain );
    }
}
