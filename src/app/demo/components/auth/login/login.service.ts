import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { EstadoService } from 'src/app/demo/services/estado/estado.service';
import { OngService } from 'src/app/demo/services/ongs/ong.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { OngDTO } from 'src/app/demo/models/ong.dto';
import { environment } from 'src/app/demo/environments/environment';
import { jwtDecode } from "jwt-decode";



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

    private setTokenLocalStorage(response: any) {
        const {type, token} = response;
        localStorage.setItem(environment.token, token);
    
        // Decodificar o token e extrair informações do perfil
        const decodedToken = jwtDecode(token) as any;
        // Salvar informações do perfil no local storage ou em um serviço
        localStorage.setItem('userProfile', decodedToken.perfil);
    }

    public getUserProfile(): string | null {
        return localStorage.getItem('userProfile');
    }

    private removerTokenLocalStorage(): void {
        localStorage.removeItem(environment.token);
    }


}
