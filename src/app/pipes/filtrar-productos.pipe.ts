import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FiltrarProductosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg ==='' || arg?.length < 3) return value;
    const resulProds = [];
    for(const prod of value){
      if(prod.name.toLowerCase().indexOf(arg?.toLowerCase())>-1){
        resulProds.push(prod)
      }
    }
    return resulProds;
  }

}
