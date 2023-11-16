import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReciclagemComponent } from './reciclagem.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ReciclagemComponent }
	])],
	exports: [RouterModule]
})
export class ReciclagemRoutingModule { }