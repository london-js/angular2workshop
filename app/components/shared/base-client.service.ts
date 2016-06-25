import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseClient{
    baseUrl:string;

    constructor(private http:Http) {
        this.baseUrl = 'http://swapi.co/api';
    }

    public get(url:string):Observable<any> {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.baseUrl}${url}`, options);
    }
}