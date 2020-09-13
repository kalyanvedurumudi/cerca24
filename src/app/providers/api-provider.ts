
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { HttpInterceptorService } from './HttpInterceptorService';
import { GlobalvarService } from './GlobalvarService';


@Injectable()
export class ApiProvider {

   // public BaseUrl: any = 'http://localhost:9000/v1/';
    public BaseUrl: any = 'https://cerca24.com/v1/';
   
    public token = null;
    public sessiontoken = null;

    constructor(public http: HttpInterceptorService,
        private storage: Storage,
        private globalVarService: GlobalvarService) {
        this.storage.get('token').then((token) => {
            this.sessiontoken = token;

        });

    }

    setToken(): any {
        this.token = this.globalVarService.getToken();
        if (this.token == undefined || this.token == null) {
            console.log(this.sessiontoken);
            return this.sessiontoken;
            // alert(this.token);
        } else {
            return this.token;
        }
    }

    get(endpoint: string): Observable<any> {
        const token = this.setToken();
        const url = this.BaseUrl + endpoint;
        const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('X-Content-Type-Options', 'nosniff');
        headers.append('X-Frame-Options', 'SAMEORIGIN');
        const options = new RequestOptions({ headers });
        return this.http.get(url, options)
            .pipe(
                map(response => {
                    response.json();
                    return response.json();
                }));

    }

    post(endpoint: string, payload: any): Observable<any> {
        const token = this.setToken();
        const url = this.BaseUrl + endpoint;
        const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        //headers.append('Strict-Transport-Security', 'maxage=31536000');
        headers.append('X-Content-Type-Options', 'nosniff');
        headers.append('X-Frame-Options', 'SAMEORIGIN');

        const options = new RequestOptions({ headers });
        return this.http.post(url, payload, options)
            .pipe(
                map(response => {
                    response.json();
                    return response.json();
                }));

    }

    put(endpoint: string, payload: any): Observable<any> {
        const url = this.BaseUrl + endpoint;
        const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.setToken());
        // headers.append('Strict-Transport-Security', 'maxage=31536000');
        headers.append('X-Content-Type-Options', 'nosniff');
        headers.append('X-Frame-Options', 'SAMEORIGIN');

        const options = new RequestOptions({ headers });
        return this.http.put(url, payload, options)
            .pipe(
                map(response => {
                    response.json();
                    return response.json();
                }));

    }


    login(endpoint: string, payload: any): Observable<any> {
        const url = this.BaseUrl + endpoint;
        const headers = new Headers();
        headers.append('X-Content-Type-Options', 'nosniff');
        headers.append('X-Frame-Options', 'SAMEORIGIN');
        const options = new RequestOptions({ headers });
        return this.http.post(url, payload, options)
            .pipe(
                map(response => {
                    response.json();
                    return response.json();
                }));

    }
}