import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseURL = 'http://localhost:8080/api/perfils';

  constructor(private http: HttpClient) { }

  listarPerfils(): Observable<any> {
    return this.http.get(this.baseURL);
  }
  
  obterPerfil(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }
  
  criarPerfil(perfil: any): Observable<any> {
    return this.http.post(this.baseURL, perfil);
  }
  
  atualizarPerfil(id: number, perfil: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, perfil);
  }
  
  deletarPerfil(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
