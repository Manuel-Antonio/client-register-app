import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private securityApiUrl = 'http://localhost:3000/generate-token'; // URL del microservicio de seguridad

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    return this.http.post<string>(this.securityApiUrl, {}); // Llamada para obtener el token
  }
}
