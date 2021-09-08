import { Component, OnInit } from '@angular/core';
import { CartServer } from 'src/app/interfaces/cart.interfaces';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: CartServer;
  cartTotal: number;

  contadorCarrito: number;

  constructor(public cartService: CartService) {
  }

  ngOnInit() {

    this.cartService.cartTotal$.subscribe(total => {
    this.cartTotal = total;
  });

  this.cartService.cartDataObs$.subscribe(data =>{
    this.cartData = data
    // console.log("sjkl",this.cartData)
    // if(this.cartData.data[0].numInCart === 0){

    // }

    // this.cartData.data.shift()
  }
    );

  // console.log(this.cartData.data)

  }

}
