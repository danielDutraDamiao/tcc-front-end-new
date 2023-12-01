import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CategoriaDTO } from 'src/app/demo/models/categoria.dto';
import { SubCategoriaDTO } from 'src/app/demo/models/subcategoria.dto';
import { CategoriaService } from 'src/app/demo/services/categorias/categoria.service';
import { SubCategoriaService } from 'src/app/demo/services/subcategorias/subcategorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/demo/services/produtos/produto.service';
import { Message } from 'primeng/api';
import { UserService } from 'src/app/demo/services/user/user.service';
import { LoginService } from '../../auth/login/login.service';

@Component({
  templateUrl: './doacao-produtos.component.html',
})
export class DoacaoProdutosComponent implements OnInit {
  produtoForm: FormGroup;
  categorias: CategoriaDTO[] = [];
  subCategorias: SubCategoriaDTO[] = [];
  categoriaSelecionada: any;
  subCategoriaSelecionada: any;
  subCategoriasFiltradas: SubCategoriaDTO[] = [];
  messages: Message[] | undefined;


  constructor(
     private categoriaService: CategoriaService,
     private subCategoriaService: SubCategoriaService,
     private produtoService: ProdutoService,
     private userService: UserService,
     private loginService: LoginService

    ) { 
      this.produtoForm = new FormGroup({
        nomeProduto: new FormControl('', Validators.required),
        precoProduto: new FormControl('', Validators.required),
        quantidade: new FormControl('', Validators.required),
        categoria: new FormControl(null, Validators.required),
        subcategoria: new FormControl(null, Validators.required) // Alterado de 'subCategoria' para 'subcategoria'
      });
      
    }

  ngOnInit() {
    forkJoin({
      categorias: this.categoriaService.listarCategorias(),
      subCategorias: this.subCategoriaService.listarSubCategorias(),
    }).subscribe(result => {
      this.categorias = result.categorias;
      this.subCategorias = result.subCategorias;
      console.log(this.categorias);
      console.log(this.subCategorias);
    });

  }

  enviarFormulario() {
    if (this.produtoForm.valid) {
      this.produtoService.criarProduto(this.produtoForm.value).subscribe(
        resposta => {
          this.messages = [{ severity: 'success', summary: 'Sucesso', detail: 'Produto doado com sucesso! $50 EcoCoins' }];
          const userId = this.obterUserId();
                if (userId) {
                    this.atualizarEcoCoinsDoUsuario(userId, 50); // Atualizar EcoCoins após doação bem-sucedida
                } else {
                    console.error('Erro: ID do usuário não encontrado');
                }
        },
        erro => {
          this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Falha ao doar o produto.' }];
        }
      );
    } else {
      this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Formulário inválido.' }];
    }
  }

  // Em DoacaoProdutosComponent
atualizarEcoCoinsDoUsuario(userId: number, ecoCoins: number) {
  this.userService.atualizarEcoCoins(userId, ecoCoins).subscribe(
    () => {
      console.log('EcoCoins atualizados com sucesso!');
    },
    erro => {
      console.error('Erro ao atualizar EcoCoins', erro);
    }
  );
}


  obterUserId(): number {
    const userId = this.loginService.getUserId();
    return userId ? userId : 0; 
}

  

  onCategoriaChange(categoria: any) {
    console.log('Categoria selecionada:', categoria);
    if (categoria && categoria.idCategoria) {
        this.subCategoriasFiltradas = this.subCategorias.filter(subCat => subCat.categoria.idCategoria === categoria.idCategoria);
    } else {
        this.subCategoriasFiltradas = []; // Limpa ou define para todas as subcategorias se necessário
    }
}

  

}
