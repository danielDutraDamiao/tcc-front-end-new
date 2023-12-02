import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { CategoriaDTO } from 'src/app/demo/models/categoria.dto';
import { ProdutoDTO } from 'src/app/demo/models/produto.dto';
import { SubCategoriaDTO } from 'src/app/demo/models/subcategoria.dto';
import { ProductService } from 'src/app/demo/service/product.service';
import { SubCategoriaService } from 'src/app/demo/services/subcategorias/subcategorias.service';
import { CategoriaService } from 'src/app/demo/services/categorias/categoria.service';
import { ProdutoService } from 'src/app/demo/services/produtos/produto.service';
import { LoginService } from '../../auth/login/login.service';
import { Message } from 'primeng/api';
import { UserService } from 'src/app/demo/services/user/user.service';

@Component({
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  categorias: CategoriaDTO[] = [];
  produtos: ProdutoDTO[] = [];
  items!: MegaMenuItem[];
  subCategorias: SubCategoriaDTO[] = [];
  defaultImageUrl: string = 'src\assets\images\Earth.png';
  exibirDialogo: boolean = false;
  produtoSelecionado: ProdutoDTO | null = null;
  quantidadeCompra: number = 1; // Quantidade inicial
  messages: Message[] = [];
  maxEcoPoints: number = 0;
  ecoPointsUsados: number = 0;


  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private loginService: LoginService,
    private subCategoriaService: SubCategoriaService,
    private productService: ProductService,
    private userService: UserService
  ) { this.items = []; }

  ngOnInit() {
    forkJoin({
        categorias: this.categoriaService.listarCategorias(),
        subCategorias: this.subCategoriaService.listarSubCategorias(),
        produtos: this.produtoService.listarProdutos()
    }).subscribe(result => {
        this.categorias = result.categorias;
        this.subCategorias = result.subCategorias;
        this.produtos = result.produtos.filter(produto => produto.tipo === 'VENDA');
        this.items = this.buildMenu(this.produtos);
    });
}



  buildMenu(produtos: ProdutoDTO[]): MegaMenuItem[] {
    const menuItems: MegaMenuItem[] = [];

    this.categorias.forEach(categoria => {
      console.log('Processando categoria:', categoria.nomeCategoria);
      const categoriaMenuItem: MegaMenuItem = {
        label: categoria.nomeCategoria,
        items: [[]]
      };

      const subCategoriasRelevantes = this.subCategorias.filter(subCategoria =>
        subCategoria.categoria.idCategoria === categoria.idCategoria
      );


      subCategoriasRelevantes.forEach(subCategoria => {
        console.log('Processando subcategoria:', subCategoria.nomeSubCategoria);
        const subCategoriaItems: MenuItem[] = [];

        console.log('Todos os produtos:', produtos);

        const produtosRelevantes = produtos.filter(produto => {
          console.log('Verificando produto:', produto.nomeProduto)
          const produtoSubCatId = produto.subcategoria?.idSubCategoria;
          const currentSubCatId = subCategoria?.idSubCategoria;

          console.log('Verificando produto:', produto.nomeProduto);
          console.log('ID da subcategoria do produto:', produtoSubCatId);
          console.log('ID da subcategoria atual:', currentSubCatId);

          if (produto.subcategoria && produto.subcategoria.idSubCategoria) {
            return produto.subcategoria.idSubCategoria == subCategoria.idSubCategoria;
          }
          return false;
        });

        produtosRelevantes.forEach(produto => {
          subCategoriaItems.push({
            label: produto.nomeProduto,
          });
        });

        categoriaMenuItem.items![0].push({
          label: subCategoria.nomeSubCategoria,
          items: subCategoriaItems
        });
      });

      menuItems.push(categoriaMenuItem);
    });

    console.log('Menu:', menuItems)
    return menuItems;
  }

  comprarProduto(produto: ProdutoDTO) {
    const userId = this.loginService.getUserId();
    if (userId) {
        this.userService.getEcoPointsDoUsuario(userId).subscribe({
            next: (ecoPoints) => {
                this.maxEcoPoints = ecoPoints;
                this.produtoSelecionado = produto;
                this.exibirDialogo = true;
            },
            error: (erro) => {
                // Handle error
            }
        });
    }
}

  fecharDialogo() {
    this.exibirDialogo = false;
    this.produtoSelecionado = null;
  }

  confirmarCompra() {
    const userId = this.loginService.getUserId();
    if (this.produtoSelecionado) {
      this.produtoService.processarCompra(this.produtoSelecionado.idProduto, userId, this.quantidadeCompra, this.ecoPointsUsados)
      .subscribe({
          next: (resposta) => {
            this.messages = [{ severity: 'success', summary: 'Compra Confirmada', detail: 'Sua compra foi realizada com sucesso!' }];
          },
          error: (erro) => {
            // Verificar se o erro é específico de ecoCoins insuficientes
            if (erro.error === 'EcoCoins insuficientes para realizar a compra.') {
              this.messages = [{ severity: 'warn', summary: 'EcoCoins Insuficientes', detail: 'Você não possui EcoCoins suficientes para esta compra.' }];
            } else {
              this.messages = [{ severity: 'error', summary: 'Erro no Processamento', detail: 'Erro ao processar a compra!' }];
            }
          }
        });
  
      this.fecharDialogo();
    }
  }
  


  getSeverity(status: string): string {
    switch (status) {
      case 'Em Estoque':
        return 'success';
      case 'Baixo Estoque':
        return 'warning';
      case 'Sem Estoque':
        return 'danger';
      default:
        return 'secondary'; // ou outro valor padrão
    }
  }
}
