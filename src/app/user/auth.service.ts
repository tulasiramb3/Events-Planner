import {Injectable} from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AuthService {
    currentUser: IUser;
    constructor(private http: HttpClient) {}
    loginUser(userName: string,password: string) {
        // this.currentUser={
        //     id: 1,
        //     userName : "tulasiramb3",
        //     firstName : "Tulasiram",
        //     lastName : "Putta"
        // }
        const loginInfo= {username:userName,password};
        const url = '/api/login';
        const options = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.post(url,loginInfo,options)
        .pipe(tap(data=> {
            this.currentUser = data as IUser;
        }))
        .pipe(catchError(err=> {
                return of(false);
        }));
    }
    isAuthenticated() {
        return !!this.currentUser;
    }
    checkAuthenticationStatus() {
        const url= '/api/currentIdentity';
        this.http.get(url)
        .pipe(tap(data=> {
            if(data instanceof Object) {
                this.currentUser=data as IUser;
            }
        })).subscribe();
    }
    updateCurrentUser(firstName?: string,lastName?: string) {
        this.currentUser.firstName=firstName;
        this.currentUser.lastName=lastName;
        const url=`/api/users/${this.currentUser.id}`;
        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.http.put(url,this.currentUser,options).subscribe();
    }
    logout() {
        this.currentUser=undefined;
        const options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post('/api/logout',{},options);
    }
}
