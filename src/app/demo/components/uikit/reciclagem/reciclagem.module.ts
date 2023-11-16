import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReciclagemRoutingModule } from './reciclagem-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect'; // Verifique o caminho correto
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TableModule } from 'primeng/table';
import { ReciclagemComponent } from './reciclagem.component';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';





@NgModule({
  declarations: [ReciclagemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReciclagemRoutingModule,
    CarouselModule,
    CardModule,
    MultiSelectModule,
    ChipModule, 
    ButtonModule,
    CascadeSelectModule,
    TableModule
  ]
})
export class ReciclagemModule { }
