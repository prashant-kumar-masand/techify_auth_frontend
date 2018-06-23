import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BackendService {

    token: string;

    private subject = new Subject<any>();
    constructor(private http: Http) {
        console.log("env", environment)
    }

    clearLocalStorage() {
        localStorage.clear();
        sessionStorage.clear();
    }

    getHeaderOfApplication() {
        let headers = new Headers();
        headers.append('Content-Type', "application/json")
        headers.append('auth-token', localStorage.getItem('auth-token'))
        return headers;
    }

    getHeaderOfApplication2() {
        let headers = new Headers();
        headers.append('Content-Type', "application/json")
        return headers;
    }

    signupUser(data) {
        console.log("control in the signup user service", data);
        return this.http.post(environment.serverUrl + 'web/signup', data, { headers: this.getHeaderOfApplication2() })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error || 'Server error')
            });
    }

    loginUser(data) {
        console.log("control in the login user service");
        return this.commonPostResponseHandler('web/login', { email: data.email, password: data.password })
    }

    logoutUser() {
        console.log("control in the logout user service");
        return this.commonPostResponseHandler('web/logout', {})
    }

    getUserData() {
        console.log("control in the home service");
        return this.commonGetResponseHandler('web/dashboard/home')
    }


    authenticateValidator() {
        this.token = localStorage.getItem('auth-token') || null;

        if (this.token) {
            console.log("token is:", this.token);
            return true;
        } else {
            this.clearLocalStorage();
            return false;
        }

    }


    subjectSubscription(): Observable<any> {
        return this.subject.asObservable();
    }
    commonPostResponseHandler(url, searchObj) {
        this.subject.next({ loader: true });
        return this.http.post(environment.serverUrl + url, searchObj, { headers: this.getHeaderOfApplication() })
            .map((res: Response) => {
                this.subject.next({ loader: false });
                return res.json();
            })
            .catch((error: any) => {
                this.subject.next({ loader: false });
                return Observable.throw(error.json() || 'Server error')
            });
    }

    commonPutResponseHandler(url, searchObj) {
        this.subject.next({ loader: true });
        return this.http.put(environment.serverUrl + url, searchObj, { headers: this.getHeaderOfApplication() })
            .map((res: Response) => {
                this.subject.next({ loader: false });
                return res.json();
            })
            .catch((error: any) => {
                this.subject.next({ loader: false });
                return Observable.throw(error || 'Server error')
            });
    }

    commonGetResponseHandler(url) {
        this.subject.next({ loader: true });
        return this.http.get(environment.serverUrl + url, { headers: this.getHeaderOfApplication() })
            .map((res: Response) => {
                this.subject.next({ loader: false });
                return res.json();
            })
            .catch((error: any) => {
                this.subject.next({ loader: false });
                return Observable.throw(error || 'Server error')
            });
    }
}
