import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductImageDetailService } from '../../../services/product-image-detail.service';
import { ProductImageDetail } from '../../../models/ProductImageDetail';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { InsertReviewsComponent } from '../../reviews/insert-reviews/insert-reviews.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReviewsService } from '../../../services/reviews.service';
import { Reviews } from '../../../models/reviews';


import { MAT_BUTTON_TOGGLE_GROUP_DEFAULT_OPTIONS_FACTORY, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { PersonalizedDetail } from '../../../models/personalizeddetail';
import { PersonalizedProductDetail } from '../../../models/personalizedproductdetail';
import { AllDetailByProduct } from '../../../models/allDetailByProduct';
import { PersonalizedproductdetailsService } from '../../../services/personalizedproductdetails.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CarritoComponent } from '../../carrito/carrito.component';
import { Carrito } from '../../../models/carrito';
import { privateDecrypt } from 'crypto';
import { PersonalizedDetailService } from '../../../services/personalized-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-detail-product-for-sale',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './detail-product-for-sale.component.html',
  styleUrl: './detail-product-for-sale.component.css'
})
export class DetailProductForSaleComponent implements OnInit {
  idProduct: number = 0
  allImages: ProductImageDetail[] = []
  allReviews: Reviews[] = []
  selectedImage: string = '';
  selectedIndex: number = 0;
  stars: boolean[] = [false, false, false, false, false];
  rating: number = 0;
  productEnCompra: Product = new Product();
  allDetailByProduct: AllDetailByProduct[] = [];

  perProdDeta: PersonalizedProductDetail[] = []
  perDeta: PersonalizedDetail[] = []
  cantidad: number = 1
  MMCantidad_decre: boolean = false
  MMCantidad_incre: boolean = false
  detalleElegido: PersonalizedDetail = new PersonalizedDetail()
  detalleTemp: PersonalizedDetail = new PersonalizedDetail()
  existeProd: Boolean = false
  carritoAgregar: Carrito = new Carrito();
  myCart$ = this.productS.myCart$;

  @ViewChild('detalleSelect') detalleSelec!: MatSelect;
  constructor(
    private router: ActivatedRoute,
    private imagesS: ProductImageDetailService,
    private matdialog: MatDialog,
    private reviewsS: ReviewsService,
    private productS: ProductsService,
    private personalizedS: PersonalizedproductdetailsService,
    private detallePS: PersonalizedDetailService,
    private _snackBar: MatSnackBar,

  ) { }
  ngOnInit(): void {
    this.idProduct = this.router.snapshot.params["idProduct"];

    this.imagesS.listImageByProductId(this.idProduct).subscribe((res: ProductImageDetail[]) => {
      this.allImages = res
      if (this.allImages.length > 0) {
        this.selectedImage = this.allImages[0].imageRoute;
      }
    })
    this.reviewsS.listAllByProduct(this.idProduct).subscribe((data) => {
      this.allReviews = data
    })
    this.reviewsS.getList().subscribe((data) => {
      this.allReviews = data
    })
    this.productS.listId(this.idProduct).subscribe((data) => {
      this.productEnCompra = data
    })
    this.personalizedS.listAllDetailByProduct(this.idProduct).subscribe((data) => {
      this.allDetailByProduct = data
    })

  }
  // SCROL DE LAS IMAGENES
  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
    this.selectedIndex = this.allImages.findIndex(image => image.imageRoute === imageUrl);
  }
  previousImage(): void {
    if (this.allImages.length > 0) {
      this.selectedIndex = (this.selectedIndex > 0) ? this.selectedIndex - 1 : this.allImages.length - 1;
      this.selectedImage = this.allImages[this.selectedIndex].imageRoute;
    }
  }
  nextImage(): void {
    if (this.allImages.length > 0) {
      this.selectedIndex = (this.selectedIndex < this.allImages.length - 1) ? this.selectedIndex + 1 : 0;
      this.selectedImage = this.allImages[this.selectedIndex].imageRoute;
    }
  }
  // REGISTRAR RESEÑA
  OpenModalInsert(id: number, urlImageP: string | null) {
    const dialogRef = this.matdialog.open(InsertReviewsComponent, {
      data: { idProduct: id, urlImage: urlImageP }, width: '35%', height: '65%'
    })
  }
  // TODO SOBRE LA COMPRA
  decrease() {
    if (this.cantidad <= 1) {
      this.MMCantidad_decre = true
    }
    else {
      this.cantidad--
      this.MMCantidad_decre = false
      this.MMCantidad_incre = false
    }
  }
  increase() {
    if (this.cantidad >= 15) {
      this.MMCantidad_incre = true
    }
    else {
      this.cantidad++
      this.MMCantidad_incre = false
      this.MMCantidad_decre = false
    }
  }
  // Manejar cambio de selección
  onDetailSelect(event: any) {
    const idDetalleSeleccionado = event.value;
    if (idDetalleSeleccionado !== 100) {
      this.detallePS.listId(idDetalleSeleccionado).subscribe((data) => {
        this.detalleTemp = data;
      });
    } else {
      this.detalleTemp = new PersonalizedDetail();
    }
  }
  // CARRITO
  AddToCart() {
    this.exiteProducto(this.productEnCompra);
    if (!this.existeProd) {
      this.carritoAgregar.imagenProducto = this.allImages[0]
      this.carritoAgregar.cantidad = this.cantidad,
      this.carritoAgregar.personalized = this.detalleTemp
      this.carritoAgregar.product = this.productEnCompra
      this.productS.InsertCarrito(this.carritoAgregar);
      this.mostrarMensaje("El producto fue agregado al carrito 😊")
    }
    else{
      this.mostrarMensaje("Los productos ya esta en tu carrito 😉")
    }
  }
  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  async exiteProducto(product: Product) {
    await this.myCart$.forEach(items => {
      items.forEach(item => {
        if (item.product == product) {
          this.existeProd = true
        }
      });
    });
    console.log(this.existeProd);
    // return this.existe
  }

} 
