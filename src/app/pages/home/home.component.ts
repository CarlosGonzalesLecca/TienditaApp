import { Component, OnInit, ViewChild} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Producto } from '../../interfaces/productos.interfaces';
import * as datos from '../../../assets/json/db.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  
  filterProds: '';
  products: any;

  //matformfield
  termino: string;
  productoSeleccionado! : Producto[]; 
  errorfound: boolean = false;
  poralfa:string = ''
 
  @ViewChild('searchInput') searchInput:HTMLInputElement;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.productService.getProducts().subscribe(prods=>{
      this.products = prods
    })   
    
    this.addRedLine()
     
  }
   

  addRedLine(){

    const link = document.querySelectorAll('.selector')
    link.forEach(link=>{
      link.classList.remove('active')
      link.addEventListener('click',(e)=>{        
          link.classList.add('active')
      })
    })
      // link.classList.remove('active')
    
    
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
    const objt = datos.productos
    const prods = objt.filter(prod=>prod.name.toLocaleLowerCase().includes(this.termino.toLocaleLowerCase()))
     this.products = prods
     if(prods.length === 0){
      return this.errorfound = true
     }else{
       return this.errorfound = false
     }
  }


  //este metodo pondra en el input la opcion seleccionada 
  opcionseleccionada(event:MatAutocompleteSelectedEvent){
    
    const producto:Producto = event.option.value    
    this.termino= producto?.name
    this.buscar()
    
  }

  //funcion para PIPE
  ordenarporalfa(valor:string){
    this.poralfa = valor
  }

}
