import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// Define una interfaz para los datos de registro del cliente
export interface ClientRegisterData {
  name: string;
  email: string;
  password: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class SdkService {
  private securityApiUrl = 'http://localhost:3000/token'; // URL del microservicio de seguridad
  private clientApiUrl = 'http://localhost:3001/clients'; // URL del microservicio de clientes

  constructor(private http: HttpClient) {}

  // Función para obtener el token desde el microservicio de seguridad
  getToken(): Observable<string> {
    return this.http.post<{ token: string }>(this.securityApiUrl, {}).pipe(
      map((response) => response.token) // Extraer el token de la respuesta
    );
  }

  // Función para registrar al cliente en el microservicio de clientes
  registerClient(clientData: ClientRegisterData): Observable<any> {
    return this.http.post(this.clientApiUrl, clientData);
  }
}
