import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { EmpireService } from './empire.service';
import { Villain } from '../shared/models';

@Component({
   selector : 'empire-detail',
   template : `
    Detail of {{ id }}
    <p>
      Name {{ villain?.name }}
    </p>
    <p>
      Height {{ villain?.height }}
    </p>
     <p>
      Gender {{ villain?.gender }}
    </p>
    <div>
        <a [routerLink]="['/empire']">Home</a> 
    </div>
   `,
   directives : [ ROUTER_DIRECTIVES ] 
})
export class EmpireDetailComponent implements OnInit {
    id:number;
    villain:Villain;
    
    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private empireService:EmpireService
        ){
         
    }
    
    ngOnInit(){
        var me = this;
        this.route.params.subscribe(params => {
            let id = params['id']; // (+) converts string 'id' to a number
            me.id = id;
            this.empireService.getVillainDetail( me.id ).subscribe( villain => this.villain = villain );
        });
        
        // load item by id
    }
}