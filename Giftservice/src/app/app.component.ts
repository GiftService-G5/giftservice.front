import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatBadgeModule} from '@angular/material/badge';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule, 
    MatExpansionModule,
    MatBadgeModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'giftServiceFrontend';
  role: string = '';
  cantidadEnCarrito: number = 0
  myCart$ = this.productS.myCart$; 
  totalInCart$ = this.productS.cartItemCount$;
  constructor(private loginService:LoginService,
    private productS: ProductsService
  ){}
  
  ngOnInit(): void { 
    this.totalInCart$.subscribe(count => {
      this.cantidadEnCarrito= count;
    });

  }
  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
}



