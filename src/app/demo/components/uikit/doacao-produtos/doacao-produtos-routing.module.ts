import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoacaoProdutosComponent } from './doacao-produtos.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DoacaoProdutosComponent }
	])],
	exports: [RouterModule]
})
export class DoacaoProdutosRoutingModule { }
