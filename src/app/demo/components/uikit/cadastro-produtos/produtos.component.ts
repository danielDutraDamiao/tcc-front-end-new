import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CategoriaDTO } from 'src/app/demo/models/categoria.dto';
import { SubCategoriaDTO } from 'src/app/demo/models/subcategoria.dto';
import { CategoriaService } from 'src/app/demo/services/categorias/categoria.service';
import { SubCategoriaService } from 'src/app/demo/services/subcategorias/subcategorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/demo/services/produtos/produto.service';
import { Message } from 'primeng/api';

@Component({
  templateUrl: './produtos.component.html',
})
export class ProdutosComponent implements OnInit {
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
     private produtoService: ProdutoService

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
        // Criar um objeto com os dados do formulário e o tipo definido como 'VENDA'
        const produtoData = {
            ...this.produtoForm.value,
            tipo: 'VENDA'  // Adicionar a propriedade tipo
        };

        this.produtoService.criarProduto(produtoData).subscribe(
            resposta => {
                console.log('Produto criado:', resposta);
                this.messages = [{ severity: 'success', summary: 'Sucesso', detail: 'Produto criado com sucesso!' }];
            },
            erro => {
                console.error('Erro ao criar produto:', erro);
                this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Falha ao criar o produto.' }];
            }
        );
    } else {
        this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Formulário inválido.' }];
    }
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
