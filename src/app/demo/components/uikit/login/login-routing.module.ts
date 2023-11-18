import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './logincomponent'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LoginComponent }
	])],
	exports: [RouterModule]
})
export class LoginRoutingModule { }