import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcocoinsComponent } from './ecocoins.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EcocoinsComponent }
	])],
	exports: [RouterModule]
})
export class EcocoinsRoutingModule { }