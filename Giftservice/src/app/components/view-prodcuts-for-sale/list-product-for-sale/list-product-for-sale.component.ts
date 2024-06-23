import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductsForSale } from '../../../models/ProductsForSale';
import { ReviewsService } from '../../../services/reviews.service';
import { ProductsService } from '../../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../models/product';
import { Carrito } from '../../../models/carrito';
import { ProductImageDetail } from '../../../models/ProductImageDetail';
import { ProductImageDetailService } from '../../../services/product-image-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';;
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-list-product-for-sale',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatInputModule,
    RouterModule,
    MatCardModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatSliderModule
  ],
  templateUrl: './list-product-for-sale.component.html',
  styleUrl: './list-product-for-sale.component.css'
})

export class ListProductForSaleComponent implements OnInit {
  liststProducts: ProductsForSale[] = []
  allProducts: ProductsForSale[] = [];
  carritoAgregar: Carrito = new Carrito();
  allImages: ProductImageDetail[] = []
  productEnCompra: Product = new Product();
  selectedCheckbox: string = '';
  priceRange: number = 0;
  maxPrice: number = 1000;


  constructor(
    private prs: ProductsService,
    private router: Router,
    private imagesS: ProductImageDetailService,
    private productS: ProductsService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.prs.listProductForSale().subscribe((data) => {
      this.allProducts = data;
      this.liststProducts = data;  // Inicialmente muestra todos los productos
      this.maxPrice = Math.max(...data.map(p => p.priceProduct));
    })
    this.productS.getListProducForSale().subscribe((data) => {
      this.allProducts = data;
      this.liststProducts = data;  // Inicialmente muestra todos los productos
    })
  }
  OpenProduct(id: number) {
    this.router.navigate([`/viewsProducts/viewProductDetail/${id}`]);
  }
  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
  onCheckboxChange(selectedValue: string) {
    this.selectedCheckbox = selectedValue;
    this.filterProductsByCategory(selectedValue);
  }

  filterProductsByCategory(category: string) {
    if (category === 'Todos') {
      this.liststProducts = this.allProducts;
    } else {
      this.liststProducts = this.allProducts.filter(productForsale => productForsale.nameCategory === category);
    }
  }
}
