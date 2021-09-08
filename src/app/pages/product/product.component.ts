import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../interfaces/productos.interfaces';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: Producto = {
    id: 0,
    name: "",
    category:"",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    images: []
  };

  codigo:number

  secondaryImages: any[] = [];

  @ViewChild('quantity') quantityInput;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { 

  }
  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(param=>{
      this.codigo = param.id
      console.log(this.codigo)      
    })

    this.productService.getSingleProduct(this.codigo*1).subscribe(prod=>{
      this.producto = prod[0]
      console.log(this.producto)
      this.secondaryImages = this.producto.images
    })
  }

    
  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.producto.quantity >= 1){
      value++;

      if (value > this.producto.quantity) {
        // @ts-ignore
        value = this.producto.quantity!;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.producto.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

}
