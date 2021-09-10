import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartServer} from '../interfaces/cart.interfaces';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private cartDataServer: CartServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  //2 OBSERVADORES QUE IRAN OBSERVANDO EL COMPORTAMIENTO DE DICHAS VARIABLES
  cartTotal$ = new BehaviorSubject<number>(0);
  cartDataObs$ = new BehaviorSubject<CartServer>(this.cartDataServer);


  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  AddProductInCart(id: number , quantity?: number){
    //1er paso (analizar el valor del cardataserver)
    this.productService.getSingleProduct(id).subscribe(actualProd=>{
      if (this.cartDataServer.data[0].product  === undefined){
        this.cartDataServer.data[0].product = actualProd
      }else{
        this.cartDataServer.data.push({
          product: actualProd,
          numInCart:1
        })      
      }
      
      let Total = 0;
        this.cartDataServer.data.forEach( p =>{
          const price = p.product[0].price
          Total +=  price
        })
      
      this.cartDataServer.total = Total;  
      this.cartTotal$.next(this.cartDataServer.total);
      this.cartDataObs$.next({...this.cartDataServer});
    })
  }


  calculateTotal(){
    let Total = 0;
    //para cada producto se tendra un total , por ejemplo si del primer producto hay 3 items q valen 100
    //entonces el total sera( 0 + (3*100))= 300), luego para el segundo item si hay 5 items que valen 200,
    // el total sera (300 + (5*200)= 1300), y asi susecivamente...
    //
    this.cartDataServer.data.forEach( p =>{
      const price = p.product?.price
      const numInCart = p.numInCart
      Total += numInCart * price
    })
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }


}
