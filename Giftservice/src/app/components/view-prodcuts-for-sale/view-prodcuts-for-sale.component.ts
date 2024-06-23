import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ListProductForSaleComponent } from './list-product-for-sale/list-product-for-sale.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../../guard/auth.interceptor';

@Component({
  selector: 'app-view-prodcuts-for-sale',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    ListProductForSaleComponent
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true
  //   }
  // ],
  templateUrl: './view-prodcuts-for-sale.component.html',
  styleUrl: './view-prodcuts-for-sale.component.css'
})
export class ViewProdcutsForSaleComponent implements OnInit {
  imageSrc: string = '';
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.imageSrc = 'http://localhost:8084/media/tr01.jpeg';
  }
  
}
