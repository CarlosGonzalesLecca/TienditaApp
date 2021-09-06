import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
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

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  filterProds: '';
  products: Producto[] = [];

  //matformfield
  termino: string = "";
  productoSeleccionado! : Producto[]; 
  errorfound: boolean = false;
  poralfa:string = ''
 

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
    ) { 
      
    }

  ngOnInit(): void {
    //metodo matriz para traer todos los productos al inicializar el componente
    this.productService.getProducts().subscribe(resp=>{
      this.products = resp
    })
  }

  //Este metodo llevara al componente producto
  selectProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  //este metodo traera un solo producto al hace click en las opciones del mat-autocomplete
  getProductForOptionSelect(prod:string){
    this.productService.getForTermino(prod).subscribe(prod=>{
      this.products = prod
    })
  }

  
  AddProduct(id: number) {
    this.cartService.AddProductToCart(id);
  }

  
  //este metodo traera todos los productos al hacer click en el span "TODOS"
  selectAllProducts(){
    this.productService.getProducts().subscribe(prods=>{
      this.products = prods
    })
  }

  //este metodo traera los productos filtrados por categoria para cada span
  selectforCategory(cat:string){
    this.productService.getForCategory(cat).subscribe(prods=>{
      this.products = prods
    })
    this.termino = ''
  }


  //este metodo buscara productos mediante el valor del mat-input
  buscar(){
    this.productService.getForTermino(this.termino)
     .subscribe(resp=>{
       this.products = resp
     },err=>{
      this.errorfound = true
      this.products = []
    })
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
