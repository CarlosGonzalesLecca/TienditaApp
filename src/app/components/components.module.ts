import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from '../pages/product/product.component';
import { TarjetaProductComponent } from './tarjeta-product/tarjeta-product.component';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    TarjetaProductComponent
  ],
  exports:[
    CartComponent,
    ProductComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
