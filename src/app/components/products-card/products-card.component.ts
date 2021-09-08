import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent {

  @Input() product:any;
  constructor(
    private router: Router,
    private cartService: CartService
    ) {}


  //Este metodo llevara al componente producto
  selectProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
  
  AddProduct(id: number) {
    this.cartService.AddProductInCart(id)
  }
}
