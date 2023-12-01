import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoDTO } from '../../models/produto.dto';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseURL = environment.baseUrlBackend + 'produtos';

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(this.baseURL);
  }

  obterProduto(id: number): Observable<ProdutoDTO> {
    return this.http.get<ProdutoDTO>(`${this.baseURL}/${id}`);
  }

  criarProduto(produto: ProdutoDTO): Observable<ProdutoDTO> {
    return this.http.post<ProdutoDTO>(this.baseURL, produto);
  }

  atualizarProduto(id: number, produto: ProdutoDTO): Observable<ProdutoDTO> {
    return this.http.put<ProdutoDTO>(`${this.baseURL}/${id}`, produto);
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  processarCompra(idProduto: number, idUsuario: number, quantidade: number): Observable<any> {
    const params = new HttpParams().set('quantidade', quantidade.toString());
    return this.http.post(`${this.baseURL}/comprar/${idProduto}/${idUsuario}`, null, { params });
  }
}
