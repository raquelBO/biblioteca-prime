import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Credenciales } from '../interface/credenciales.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private url: string = "http://localhost:3000/sesion";
  private timer: any;

  constructor(
    private http: HttpClient
  ) { }

  public iniciar(cred: Credenciales): Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.url}/iniciar`, cred).pipe(
      tap( resp => {
        //this.token = resp.token;
        localStorage.setItem('token', resp.token);
        this.procesarToken(resp.token);
      })
    );
  }

  private mantener(): Observable<{token: string}>{
    return this.http.post<{token: string}>(`${this.url}/mantener`, {token: localStorage.getItem('token')});
  }

  private procesarToken(token: string){
    const jwt: JwtHelperService = new JwtHelperService();
    const expiracion: Date | null = jwt.getTokenExpirationDate(token);
    if(expiracion){
      const renovacion: Date = new Date(expiracion.getTime()-20000);
      const ejecutarEn: number = renovacion.getTime()-Date.now();
      this.timer = setTimeout(()=>{
        this.mantener().subscribe({
          next: (resp) => {
            console.log('Nuevo token recibido');
            localStorage.setItem('token', resp.token);
            //this.token = resp.token;
            this.procesarToken(resp.token);
          },
          error: (e) =>{
            console.error('Error al mantener sesion', e);
          }
        })
      }, ejecutarEn)
    }
  }
}
