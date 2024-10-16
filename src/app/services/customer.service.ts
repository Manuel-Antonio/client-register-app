import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  registerCustomer(customerData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.baseUrl}/register`, customerData, {
      headers,
    });
  }
}
