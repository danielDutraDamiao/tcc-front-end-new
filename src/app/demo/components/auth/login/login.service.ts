import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { EstadoService } from 'src/app/demo/services/estado/estado.service';
import { OngService } from 'src/app/demo/services/ongs/ong.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { OngDTO } from 'src/app/demo/models/ong.dto';
import { environment } from 'src/app/demo/environments/environment';
import { jwtDecode } from "jwt-decode";
import { UsersDTO } from 'src/app/demo/models/users.dto';



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient) {

    }

    public login(username: string, password: string): Observable<any> {

        const url = environment.baseUrlBackend + 'login';
        return this.httpClient.post(url, { username, password }, { responseType: 'json' }).pipe(
            map((data) => this.setTokenLocalStorage(data)),
            catchError((err) => {
                this.removerTokenLocalStorage();
                throw 'Falha ao efetuar login.'
            })
        )
    }

    public getToken(): string | null {
        return localStorage.getItem(environment.token);
    }
    

    public isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        // Aqui você pode adicionar lógica adicional para verificar se o token ainda é válido
        return true;
    }

    private setTokenLocalStorage(response: any) {
        const { type, token } = response;
        localStorage.setItem(environment.token, token);
      
        // Decodificar o token e extrair informações
        const decodedToken = jwtDecode(token) as any;
        localStorage.setItem('userProfile', decodedToken.perfil);
        localStorage.setItem('userId', decodedToken.userId);
    
        console.log("Perfil do usuário: " + decodedToken.perfil);
        console.log("ID do usuário: " + decodedToken.userId);
    }
    

    public getUserProfile(): string | null {
        return localStorage.getItem('userProfile');
    }

    public removerTokenLocalStorage(): void {
        localStorage.removeItem(environment.token);
    }

    public getUserId(): number | null {
        const userId = localStorage.getItem('userId');
        return userId ? parseInt(userId) : null;
    }
    


}
