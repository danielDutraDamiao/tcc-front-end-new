import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoService } from 'src/app/demo/services/estado/estado.service';
import { OngService } from 'src/app/demo/services/ongs/ong.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { OngDTO } from 'src/app/demo/models/ong.dto';


@Injectable({
  providedIn: 'root'
})
export class DoacaoService {
  
estadoService = new EstadoService(this.http);
ongService = new OngService(this.http);

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<EstadoDTO[]>{
    try{
      return this.estadoService.listarEstados();
    } catch(error){
      console.log(error);
      throw error;
    }
  }

  listarOngs(): Observable<OngDTO[]> {
    try{
      return this.ongService.listarOngs();
    }catch(error){
      console.log(error);
      throw error;
    }
  }
 
  
}
