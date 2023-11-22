import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interface/user';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// const AUTH_API = 'http://localhost:8080/api/auth/';
// const AUTH_API = 'http://192.168.1.178:8080/api/auth/';
const AUTH_API = environment.baseURL+'auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(user:User): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',user,
      // {
      //   username,
      //   email,
      //   password,
      // },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

    
}

