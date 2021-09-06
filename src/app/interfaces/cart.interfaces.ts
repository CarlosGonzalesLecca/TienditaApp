import { Producto } from "./productos.interfaces";

export interface CartServer {
    total: number;
    data: [{
      product: Producto,
      numInCart: number
    }];
  }
  
  export interface CartUsuario {
    total: number;
    prodData: [{
      id: number,
      incart: number
    }]
  }