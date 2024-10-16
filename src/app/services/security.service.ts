import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private baseUrl = 'http://localhost:3003';

  constructor(private http: HttpClient) {}

  getSecurityToken(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/generate-token`);
  }

  validateToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validate-token`, token);
  }
}
