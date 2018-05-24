import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class apiManagerService{

    public baseUrl = 'api/meetings';   

    public customerUrl = "api/userList"

    constructor( private http: HttpClient) { }

    getMeetingsList(): Observable<any> {
        return this.http.get<any>(this.baseUrl)
        .pipe(
          tap(meetings => console.log(`fetched heroes`))
        );
    }

    getUsers(): Observable<any> {
        return this.http.get<any>(this.customerUrl)
        .pipe(
          tap(userList => console.log(`fetched heroes`))
        );
    }

    regsiterCustomer(registerParams): Observable<any> {
        return this.http.post<any>(this.customerUrl, registerParams, httpOptions).pipe(
            tap(userList => console.log(`fetched heroes`))
        );
      }
}
    
