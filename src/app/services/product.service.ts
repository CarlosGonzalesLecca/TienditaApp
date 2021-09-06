import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/productos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string = "http://localhost:3000/productos"

  constructor(private http: HttpClient) { }

  getProducts():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url)
  }

  getSingleProduct(id: Number):Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  getForCategory(categoria:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}?q=${categoria}`)
  }

  getForTermino(termino:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}?q=${termino}`)
  }
}
