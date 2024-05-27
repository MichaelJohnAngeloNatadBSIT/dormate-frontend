import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';

// const API_URL = 'http://localhost:8080/api/test/';
// const USER_URL = 'http://localhost:8080/user/';

const API_URL = 'http://192.168.1.178:8080/api/test/';
// const USER_URL = 'http://192.168.1.178:8080/api/user/';

const USER_URL = environment.baseURL+'user/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getLandlordBoard(): Observable<any> {
    return this.http.get(API_URL + 'landlord', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  retrieveUserWithId(id:any): any{
    return this.http.get(USER_URL + id);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${USER_URL}update_user_details/${id}`, data);
  }

  changePassword(id: any, data: any): Observable<any> {
    return this.http.put(`${USER_URL}change_password/${id}`, data);
  }

  uploadUserImage(id: any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${USER_URL}update_user_image/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadValidId(id: any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${USER_URL}update_valid_id/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${USER_URL}/files`);
  }

  getFriendToAdd(userId: any): Observable<User[]>{
    return this.http.get<User[]>(`${USER_URL}user_list/${userId}`);
  }

  findFriend(userId: any,title: any): Observable<User[]> {
    const url = `${USER_URL}user_list/${userId}?title=${title}`;
    return this.http.get<User[]>(url);
  }

  getUserFriendRequest(userId: any): Observable<User[]>{
    return this.http.get<User[]>(`${USER_URL}friend_request_list/${userId}`);
  }

  findFriendRequest(userId: any, title: any): Observable<User[]> {
    const url = `${USER_URL}friend_request_list/${userId}?title=${title}`;
    return this.http.get<User[]>(url);
  }

  acceptFriendRequest(user_id: any, friendRequestSender_id: any, data: any): Observable <any>{
    return this.http.put(`${USER_URL}approve_friend_request/${user_id}/${friendRequestSender_id}`, data);
  }


  addFriend(user_id: any, user: any[]): Observable <any>{
    return this.http.post(`${USER_URL}add_friend/${user_id}`, user);
  }

  retrieveUserFriendRequest(user_id:any): any{
    return this.http.get(`${USER_URL}friend_request_list/${user_id}`);
  }





  // findByTitle(title: any): Observable<Dorm[]> {
  //   const url = `${baseUrl}?title=${title}`;
  //   return this.http.get<Dorm[]>(url);
  // }

}
