import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { of } from 'rxjs';
import * as datos from '../../assets/json/db.json'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  elemento: any;

  constructor(private http: HttpClient) { }

  getProducts(){
    return of(datos.productos)
  }

  getSingleProduct(id: number) {
    let prods = datos.productos.filter(prod=>{
      return prod.id === id
    })
    this.elemento = prods
    return of(this.elemento)        
  }

  getForCategory(categoria:string){
    let prods = datos.productos.filter(prod=>{
       return prod.category === categoria 
      })
    return of(prods)
  }

  getForTermino(termino:string){
    let prods = datos.productos.filter(prod=>{
      prod.name.toLocaleLowerCase().trim().includes(termino.toLocaleLowerCase())
    })
    return prods
  }

  
}
