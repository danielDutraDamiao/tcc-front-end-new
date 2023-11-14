import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../../models/empresa.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseURL = 'http://localhost:8080/api/empresas';

  constructor(private http: HttpClient) { }

  listarEmpresas(): Observable<EmpresaDTO[]> {
    return this.http.get<EmpresaDTO[]>(this.baseURL);
  }
  
  obterEmpresas(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }
  
  criarEmpresas(empresa: any): Observable<any> {
    return this.http.post(this.baseURL, empresa);
  }
  
  atualizarEmpresas(id: number, empresa: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, empresa);
  }
  
  deletarEmpresas(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }


}