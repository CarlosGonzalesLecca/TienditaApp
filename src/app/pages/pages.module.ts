import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ComprasUserComponent } from './compras-user/compras-user.component';
import { FiltrarProductosPipe } from '../pipes/filtrar-productos.pipe';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { OrdenarPipe } from '../pipes/ordenar.pipe';
import { CommonModule } from '@angular/common';







@NgModule({
  declarations: [HomeComponent, NopagefoundComponent, ComprasUserComponent, FiltrarProductosPipe, OrdenarPipe],
  exports: [
    HomeComponent,
    FiltrarProductosPipe,
    OrdenarPipe
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,    
    PagesRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PagesModule { }
