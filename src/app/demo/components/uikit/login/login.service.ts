import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { EstadoService } from 'src/app/demo/services/estado/estado.service';
import { OngService } from 'src/app/demo/services/ongs/ong.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { OngDTO } from 'src/app/demo/models/ong.dto';
import { environment } from 'src/app/demo/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
constructor(private httpClient: HttpClient){

    }

    public login(username:string, password:string): Observable<any>{

        const url = environment.baseUrlBackend + 'login';
        return this.httpClient.post(url, {username, password}, {responseType: 'json'}).pipe(
            map((data) => this.setTokenLocalStorage(data)),
            catchError((err) =>{
                this.removerTokenLocalStorage();
                throw'Falha ao efetuar login.'
            })
        )
    }

    public getToken(): string | null{
        return localStorage.getItem(environment.token);
    }
    private setTokenLocalStorage(response: any){
        const {type, token,  } = response;
        localStorage.setItem( environment.token, token)
    }

    private removerTokenLocalStorage(): void{
        localStorage.removeItem(environment.token);
    }
 
  
}
