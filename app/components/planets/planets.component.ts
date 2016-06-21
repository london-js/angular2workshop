// resp for showing planets and their assigned people
import { Component, OnInit } from '@angular/core';
import { PlanetsService } from './planets.service';
import { Planet } from '../shared/models';

@Component({
    selector : 'planets',
    template : `
        <div>
            <h2>Planets</h2>
            <div class='data-row' *ngFor='let planet of planets' >
             {{ planet.name }}
            </div>
        </div>
        
    `
})
export class PlanetsComponent implements OnInit{ 
    planets:Array<Planet>;
    constructor(private planetsService:PlanetsService) { 
        
    }
    
    ngOnInit() {
        this.planetsService.getPlanets().subscribe( planets => this.planets = planets )
    }
}