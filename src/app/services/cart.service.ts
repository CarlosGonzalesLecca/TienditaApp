import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartServer, CartUsuario } from '../interfaces/cart.interfaces';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartDataClient: CartUsuario= {
    prodData: [{
      incart: 0,
      id: 0
    }],
     total: 0
  };  

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
    private httpClient: HttpClient,
    private router: Router,
  ) { 

    let infoUserCart: CartUsuario = JSON.parse(localStorage.getItem('cart')); 

    if (infoUserCart !== null && infoUserCart !== undefined && infoUserCart.total !== 0){
      this.cartDataClient = infoUserCart;
      this.cartDataClient.prodData.forEach(prodData=> {
        this.productService.getSingleProduct(prodData.id).subscribe(actualProduct=>{
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].product = actualProduct;
            this.cartDataServer.data[0].numInCart = prodData.incart;
            this.calculateTotal();
            this.cartDataClient.total = this.cartDataServer.total
            localStorage.setItem('cart',JSON.stringify(this.cartDataClient))
          }else{
            this.cartDataServer.data.push({
              product: actualProduct,
              numInCart: prodData.incart
            })
            this.calculateTotal()
            this.cartDataClient.total = this.cartDataServer.total
            localStorage.setItem('cart',JSON.stringify(this.cartDataClient))
          }
          // this.cartDataObs$.next({...this.cartDataServer});
        })
      });
    }
  }

  AddProductToCart(id: Number, quantity?: number) {

    this.productService.getSingleProduct(id).subscribe(prod => {
      // SI EL CARRITO ESTA VACIO
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = (quantity !== undefined) ? quantity : 1;
        this.calculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        // this.cartDataObs$.next({...this.cartDataServer});
        
      }  // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {

          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
          }


          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });          
        }
        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        // this.cartDataObs$.next({...this.cartDataServer});
      }  // END of ELSE


    });
  }


  calculateTotal(){
    let Total = 0;
    //para cada producto se tendra un total , por ejemplo si del primer producto hay 3 items q valen 100
    //entonces el total sera( 0 + (3*100))= 300), luego para el segundo item si hay 5 items que valen 200,
    // el total sera (300 + (5*200)= 1300), y asi susecivamente...
    //
    this.cartDataServer.data.forEach( p =>{
      const price = p.product.price
      const numInCart = p.numInCart
      Total += numInCart * price
    })
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);

  }


}
