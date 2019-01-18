import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
   
@Injectable()
export class apiServiceManager {
     public patchApi = "https://13.232.60.210:8010/";
    
    constructor(private _router: Router,private _http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        var token = sessionStorage.getItem('user-token');
        headers.append('authorization', token);
    }


    login(loginDetails): Observable<any> {
        let Url = this.patchApi + "adaptify-1/user/login"; 
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        console.log("headers", headers)
        return this._http.post(Url, loginDetails, {
            headers: headers
        }).map(res => res.json());
    }

}