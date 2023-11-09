import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoacaoComponent } from './doacao.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DoacaoComponent }
	])],
	exports: [RouterModule]
})
export class DoacaoRoutingModule { }