import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interface/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  url: string = 'http://localhost:3000/libro';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.url, { headers: this.ObtenerCabeceras()});
  }
  post(libro: Libro): Observable<any>{
    return this.http.post(this.url, libro, { responseType: 'text', headers: this.ObtenerCabeceras('aplication/json') });
  }
  put(libro: Libro): Observable<any>{
    return this.http.put(`${this.url}`, libro, { responseType: 'text', headers: this.ObtenerCabeceras('aplication/json') });
  }
  delete(libro : Libro): Observable<any>{
    return this.http.delete(`${this.url}-${libro.id}`, { responseType: 'text', headers: this.ObtenerCabeceras('aplication/json') });
  }
   private ObtenerCabeceras(contentType?: string): HttpHeaders{
    let cabeceras: HttpHeaders = new HttpHeaders();
    if(contentType) cabeceras = cabeceras.append('Content-type', contentType);
    const token: string | null = localStorage.getItem('token');
    if(token) cabeceras = cabeceras.append('Authorization', 'Bearer '+token);
    return cabeceras;
   } 

}
