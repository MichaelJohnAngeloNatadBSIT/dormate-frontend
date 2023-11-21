import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';
import { Dorm } from 'src/app/models/dorms.model';


const API_URL = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUser(): Observable<User[]>{
    return this.http.get<User[]>(API_URL + 'all_user');
  }

  getCountUser(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'count_user');
  }

  getAllDorm(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'all_dorm');
  }

  getCountDorm(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'count_dorm');
  }

  getCountDormApproved(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'count_dorm_approved');
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}update_user/${id}`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${API_URL}delete_user/${id}`);
  }

  getDormById(id: any): Observable<Dorm> {
    return this.http.get<Dorm>(`${API_URL}find_one/${id}`);
  }

  updateDormInfo(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}update_dorm/${id}`, data);
  }

  deleteDorm(id: any): Observable<any> {
    return this.http.delete(`${API_URL}delete_dorm/${id}`);
  }


}
