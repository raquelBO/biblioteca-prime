import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credenciales } from '../interface/credenciales.interface';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private url: string = "http://localhost:3000/sesion";

  constructor(
    private http: HttpClient
  ) { }

  public iniciar(cred: Credenciales): Observable<any>{
    return this.http.post<{token: string}>(`${this.url}/iniciar`, cred)
  }
}
