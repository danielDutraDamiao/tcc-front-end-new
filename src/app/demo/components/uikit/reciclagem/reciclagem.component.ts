import { Component, OnInit } from '@angular/core';
import { ReciclagemService } from './reciclagem.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { EmpresaDTO } from 'src/app/demo/models/empresa.dto';
import { OngDTO } from 'src/app/demo/models/ong.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reciclagem',
  templateUrl: './reciclagem.component.html',
  styleUrls: ['./reciclagem.component.css'],
})
export class ReciclagemComponent implements OnInit {

  estados: EstadoDTO[] = []; // Declarando um array de EstadoDTO
  cidadeSelecionada: any;
  options: any[];
  empresas: EmpresaDTO[] = []; // Lista original de ONGs
  empresasWithFilter: EmpresaDTO[] = []; // Lista filtrada de ONGs para exibição na tabela  

  constructor(private reciclagemService: ReciclagemService, private route: Router) {
    this.options = [];
  }


  ngOnInit() {
    this.buscarEstados();
    this.buscarEmpresas();
  }

  public buscarEmpresas(){
    this.reciclagemService.listarEmpresas().subscribe(
      (resposta: EmpresaDTO[]) => {
        this.empresas = resposta;
        this.filtrarEmpresas();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  navegarParaDoacao(ong: OngDTO) {
    // Aqui você pode usar a informação da ONG para passar como parâmetro, se necessário
    this.route.navigate(['/uikit/doacao-produtos']);
  }

  public buscarEstados() {
    this.reciclagemService.listarEstados().subscribe(estados => {
      this.options = estados.map(estado => {
        return {
          name: estado.nomeEstado,
          value: estado.idEstado,
          items: estado.cidades.map(cidade => {
            return {
              label: cidade.nomeCidade,
              value: cidade.idCidade
            };
          })
        };
      });
      console.log(this.options);
    });
  }

  public filtrarEmpresas() {
    console.log(this.cidadeSelecionada, "estado selecionado (tipo):", typeof this.cidadeSelecionada);
    
  
    if (this.cidadeSelecionada || this.cidadeSelecionada === 0) { // Inclui a verificação para o valor 0
      this.empresasWithFilter = this.empresas.filter(empresa => {
        console.log(this.empresas, "empresas dentro do filter");

        if (empresa.cidade) {
          console.log(this.empresas, "empresas dentro do if empresa.cidades");
          console.log(`Comparando: ${empresa.cidade.idCidade} com ${this.cidadeSelecionada}`);
          return empresa.cidade.idCidade === this.cidadeSelecionada;
        }
        return false; 
      });
  
      console.log(this.empresasWithFilter, "empresas filtradas fora do if");
    } else {
      this.empresasWithFilter = this.empresas;
      console.log(this.empresasWithFilter, "empresas filtradas else");
    }
  }
  
  
  
  
  

}

