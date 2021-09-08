import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Producto } from '../../interfaces/productos.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  filterProds: '';
  products: any;

  //matformfield
  termino: string;
  productoSeleccionado! : Producto[]; 
  errorfound: boolean = false;
  poralfa:string = ''
 
  @ViewChild('searchInput') searchInput;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
    ) { 
      
    }

  ngOnInit(): void {
    //metodo matriz para traer todos los productos al inicializar el componente
    this.productService.getProducts().subscribe(prods=>{
      this.products = prods
    })
    
  }

  
  //este metodo traera todos los productos al hacer click en el span "TODOS"
  selectAllProducts(){
    this.productService.getProducts().subscribe(prods=>{
      this.products = prods
    })
  }

  //este metodo traera los productos filtrados por categoria para cada span
  selectforCategory(cat:string){

    this.productService.getForCategory(cat).subscribe(filtrados=>{
      this.products = filtrados
    })
    
  }


  //este metodo buscara productos mediante el valor del mat-input

  buscar(){
    this.productService.getForTermino(this.termino)
     .subscribe(resp=>{
       const array = Array.from([resp])
       console.log("buscador",resp)     
       this.products = array;      
     })

       if(this.searchInput === ''){
        return this.productService.getProducts().subscribe(resp=>{
           this.products = resp
        })
       }
    
  }


  //este metodo pondra en el input la opcion seleccionada 
  opcionseleccionada(event:MatAutocompleteSelectedEvent){
    // if(!event.option.value){   
    //   this.heroeseleccionado = undefined   
    //   return console.log("no hay valor")
    // }
    const producto: Producto = event.option.value    
    this.termino= producto.name
      // console.log(this.heroeseleccionado)
  }

  ordenarporalfa(valor:string){
    this.poralfa = valor
  }

}
