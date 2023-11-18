import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect'; // Verifique o caminho correto
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    CardModule,
    MultiSelectModule, 
    CascadeSelectModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    ToastrModule.forRoot(),
  ]
})
export class LoginModule { }
