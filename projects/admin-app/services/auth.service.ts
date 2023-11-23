import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Admin } from '../interface/admin';
import { environment } from '../src/environments/environment';

// const AUTH_API = 'http://localhost:8080/api/auth/';
// const AUTH_API = 'http://192.168.1.178:8080/api/admin/';
const AUTH_API = environment.baseURL+'admin/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  register(admin:Admin): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup', admin, httpOptions 
      );
      // {
      //   username,
      //   email,
      //   password,
      // },
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
