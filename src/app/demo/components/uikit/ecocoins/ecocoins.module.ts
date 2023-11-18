import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcocoinsRoutingModule } from './ecocoins-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect'; // Verifique o caminho correto
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TableModule } from 'primeng/table';
import { EcocoinsComponent } from './ecocoins.component';




@NgModule({
  declarations: [EcocoinsComponent],
  imports: [
    CommonModule,
    FormsModule,
    EcocoinsRoutingModule,
    CarouselModule,
    CardModule,
    MultiSelectModule, 
    CascadeSelectModule,
    TableModule
  ]
})
export class EcocoinsModule { }
