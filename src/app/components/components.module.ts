import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { ProductComponent } from '../pages/product/product.component';
import { ProductsCardComponent } from './products-card/products-card.component';
import { HotDealComponent } from './hot-deal/hot-deal.component';


@NgModule({
  declarations: [
    CartComponent,
    ProductComponent,
    ProductsCardComponent,
    HotDealComponent
  ],
  exports:[
    CartComponent,
    ProductComponent,
    ProductsCardComponent,
    HotDealComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
