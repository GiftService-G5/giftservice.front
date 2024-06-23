import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  myCart$ = this.proS.myCart$; 
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private proS: ProductsService,
    private _snackBar:MatSnackBar
  ){}
  ngOnInit(): void {
    this.myCart$.subscribe(items => {
      this.updateSummary();
    });
  }
  removeItem(idProducto: number) {
    this.proS.removeFromCart(idProducto);
    this.updateSummary();
  }
  increaseQuantity(idProducto: number) {
    this.proS.increaseQuantity(idProducto);
    this.updateSummary();
  }

  decreaseQuantity(idProducto: number) {
    this.proS.decreaseQuantity(idProducto);
    this.updateSummary();
  }

  updateSummary() {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.myCart$.forEach(items => {
      items.forEach(item => {
        this.totalQuantity += item.cantidad;
        this.totalPrice += (item.product.priceProduct + item.personalized.additionalPricePersonalizedDetail) * item.cantidad;
      });
    });
  }
  mostrarMensaje(mensaje:string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  } 
}
