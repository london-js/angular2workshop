import { Injectable } from '@angular/core';

import { Observable }     from 'rxjs/Observable';
import { Villain } from '../shared/models';
import { BaseClient } from '../shared/base-client.service';
import { Response } from '@angular/http';

@Injectable()
export class EmpireService {
 
    villains:Array<Villain>;
    
    constructor(private baseClient:BaseClient) {
        
    }
    
    getVillainDetail(id:number): Observable<Villain> {
        //http://swapi.co/api/people/4/
        return this.baseClient.get(`/people/${id}`)
                              .map((response:Response) => {
                                  let body = response.json();
                                  return body;
                              })
    }
    
    getVillainsFromApi( cache = true ): Observable<Villain[]> {
        var me = this;
        
        if( cache && this.villains) {
            this.villains[0].assignedPlanet = 'Hoth';
            return Observable.of( this.villains );
        }
        
        return this.baseClient.get('/people/')
                    .map((response:Response) => {
                        let body = response.json();
                        me.villains = body.results;
                        return body.results;
                    })
                    .catch(this.handleError);
    }
   
    
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

