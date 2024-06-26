import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseURL+'payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  createPayment(data: any){
    return this.http.post(`${baseUrl}/create-payment`, data);
  }

  getPayment(data: any){
    return this.http.get(`${baseUrl}/get-payment/${data}`);
  }

  updatePayment(data: any){
    return this.http.put(`${baseUrl}/update-payment`, data);
  }
}
