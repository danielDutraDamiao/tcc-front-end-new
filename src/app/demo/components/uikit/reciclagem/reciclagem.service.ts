import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoService } from 'src/app/demo/services/estado/estado.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { EmpresaService } from 'src/app/demo/services/empresas/empresa.service';
import { EmpresaDTO } from 'src/app/demo/models/empresa.dto';


@Injectable({
  providedIn: 'root'
})
export class ReciclagemService {
  
estadoService = new EstadoService(this.http);
empresaService = new EmpresaService(this.http);

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<EstadoDTO[]>{
    try{
      return this.estadoService.listarEstados();
    } catch(error){
      console.log(error);
      throw error;
    }
  }

  listarEmpresas(): Observable<EmpresaDTO[]> {
    try{
      return this.empresaService.listarEmpresas();
    }catch(error){
      console.log(error);
      throw error;
    }
  }
 
  
}
