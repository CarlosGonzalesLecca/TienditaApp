import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/productos.interfaces';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(productos: Producto[], alfa: string): Producto[] {
    switch(alfa){
      case 'cantidad':
        return productos.sort( (a,b)=>(a.quantity> b.quantity) ? -1 : 1)
      case 'preciolow':
        return productos.sort( (a,b)=>(a.price > b.price) ? 1 : -1)
      case 'preciohigh':
        return productos.sort( (a,b)=>(a.price < b.price) ? 1 : -1)
      default:
        return productos
    }
  }

}
