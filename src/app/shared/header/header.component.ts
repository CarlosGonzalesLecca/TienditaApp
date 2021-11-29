import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartServer } from 'src/app/interfaces/cart.interfaces';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartData: CartServer;
  cartTotal: number;

  contadorCarrito: number;

  constructor(public cartService: CartService) {
    
  }
  

  ngOnInit() {
    
    this.cartService.cartTotal$.subscribe(total => {
    this.cartTotal = total;
  });

    this.cartService.cartDataObs$.subscribe(resp =>{
      this.cartData = resp
  }
    );

  }

}
