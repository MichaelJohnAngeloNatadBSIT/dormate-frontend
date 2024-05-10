import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dorm } from '../models/dorms.model';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:8080/api/dorm';
// const baseUrl = 'http://192.168.1.178:8080/api/dorm';
const baseUrl = environment.baseURL+'dorm';

@Injectable({
  providedIn: 'root'
})

export class DormService {
  // i = true;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Dorm[]> {
    return this.http.get<Dorm[]>(baseUrl);
  }

  getAllApproved(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(`${baseUrl}/find_all_approved/`);
  }

  getAllApprovedDormByUser(id:any): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(`${baseUrl}/approved_dorm/${id}`);
  }

  getForApproval(id: any): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(`${baseUrl}/for_approval/${id}`);
  }

  get(id: any): Observable<Dorm> {
    return this.http.get<Dorm>(`${baseUrl}/${id}`);
  }

  getDormById(id: any): Observable<Dorm> {
    return this.http.get<Dorm>(`${baseUrl}/find_one/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  findByTitle(title: any): Observable<Dorm[]> {
    const url = `${baseUrl}?title=${title}`;
    return this.http.get<Dorm[]>(url);
  }
  findByTitleWithRentHighToLow(title: any): Observable<Dorm[]> {
    const url = `${baseUrl}/rent_high?title=${title}`;
    return this.http.get<Dorm[]>(url);
  }

  findByTitleWithRentLowToHigh(title: any): Observable<Dorm[]> {
    const url = `${baseUrl}/rent_low?title=${title}`;
    return this.http.get<Dorm[]>(url);
  }

  addDormImages(id:any, file: FileList): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    Array.from(file).forEach(element => {
      formData.append('file', element);
      
    });

    const req = new HttpRequest('PUT', `${baseUrl}/add_images/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addBusinessRegImage(id:any, file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);


    const req = new HttpRequest('PUT', `${baseUrl}/add_business_registration_image/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addBarangayClearanceImage(id:any, file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);


    const req = new HttpRequest('PUT', `${baseUrl}/add_baragay_clearance_image/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addBfpCertImage(id:any, file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);


    const req = new HttpRequest('PUT', `${baseUrl}/add_bfp_image/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addMayorPermitImage(id:any, file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);


    const req = new HttpRequest('PUT', `${baseUrl}/add_mayor_permit_image/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addSanitaryPermitImage(id:any, file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);


    const req = new HttpRequest('PUT', `${baseUrl}/add_sanitary_image/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addTenant(id: any, tenantData: any[]): Observable <any>{
    return this.http.put(`${baseUrl}/add_tenant/${id}`, tenantData);
  }
}
