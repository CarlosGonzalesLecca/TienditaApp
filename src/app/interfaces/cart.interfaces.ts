import { Producto } from "./productos.interfaces";

export interface CartServer {
    total: number;
    data: [{
      product: Producto,
      numInCart: number
    }];
}
  