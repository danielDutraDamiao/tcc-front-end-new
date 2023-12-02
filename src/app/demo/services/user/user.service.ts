import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersDTO } from '../../models/users.dto';
import { LoginService } from '../../components/auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
    ) { }

  listarUsers(): Observable<any> {
    return this.http.get(this.baseURL);
  }
  
  obterUser(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }
  
  criarUser(perfil: any): Observable<any> {
    return this.http.post(this.baseURL, perfil);
  }
  
  atualizarUser(id: number, perfil: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, perfil);
  }
  
  deletarUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

 // Em UserService
 atualizarEcoCoins(userId: number, ecoCoins: number): Observable<any> {
  const params = new HttpParams().set('ecoCoins', ecoCoins.toString());
  return this.http.put(`${this.baseURL}/updateEcoCoins/${userId}`, null, { params });
}

atualizarEcoPoints(userId: number, ecoPoints: number): Observable<any> {
  const params = new HttpParams().set('ecoPoints', ecoPoints.toString());
  return this.http.put(`${this.baseURL}/updateEcoPoints/${userId}`, null, { params });
}

// UserService no Angular
getEcoPointsDoUsuario(userId: number): Observable<any> {
  return this.http.get(`${this.baseURL}/${userId}/ecopoints`);
}


obterInformacoesUsuarioLogado(): Observable<UsersDTO> {
  const userId = this.loginService.getUserId();
  return this.http.get<UsersDTO>(`${this.baseURL}/${userId}`);
}

//request body
recuperarSenha(username: string, newPassword: string, confirmPassword: string): Observable<any> {
  const body = { username, novaSenha: newPassword, confirmarNovaSenha: confirmPassword };
  return this.http.put(`${this.baseURL}/recuperarSenha`, body);
}

}
