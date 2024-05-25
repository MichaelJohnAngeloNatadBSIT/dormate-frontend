import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const VISIT_URL = environment.baseURL+'visits/';

@Injectable({
  providedIn: 'root'
})
export class VisitService {


  constructor(private http: HttpClient) { }

  getVisitCount(): Observable<any> {
    return this.http.get<any>(VISIT_URL);
  }

  incrementVisitCount(): Observable<any> {
    return this.http.post<any>(`${VISIT_URL}increment`, {});
  }
}
