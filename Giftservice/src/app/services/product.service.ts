
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductsForSale } from '../models/ProductsForSale';
import { Product } from '../models/product';
import { Carrito } from '../models/carrito';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = `${base_url}/products`

  // TODO PRODUCTOS
  private newChange = new Subject<Product[]>()
  
  // TODO CARRITO
  private newChangeProducForSale = new Subject<ProductsForSale[]>()
  private myList: Carrito[] = [] 
  private myCart =  new BehaviorSubject<Carrito[]>([])
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();
  myCart$ = this.myCart.asObservable();

  private sortList(list: Product[]): Product[] {
    return list.sort((a, b) => a.idProduct - b.idProduct);
  }
  private sortListProducForSale(list: ProductsForSale[]): ProductsForSale[] {
    return list.sort((a, b) => b.idProduct - a.idProduct);
  }
  constructor(private httpClient: HttpClient) {
    this.loadCart();
    this.updateCartItemCount();
  }

  // =========================================== TODO PRODUCTOS ============================
  list() {
    return this.httpClient.get<Product[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(product: Product) {
    return this.httpClient.post(this.url, product).pipe(
      tap(() => this.list().subscribe()));
  }
  delete(id: number) {  
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }
  update( product: Product) {
    return this.httpClient.put(`${this.url}/UpdateStock/${product.idProduct}`, product);
  }
  setList(newList: Product[]) {
    this.newChange.next(this.sortList(newList))
  }
  getList() {
    return this.newChange.asObservable();
  }
  //=========================================== TODO CARDS VISIBLES DEL HOME ===========
  listProductForSale() {
    return this.httpClient.get<ProductsForSale[]>(`${this.url}/productforsale`)
  }
  // ========================================== TODO CARRITO ===================================
  private saveCart() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('myCart', JSON.stringify(this.myList));
    }
  }

  private loadCart() {
    if (typeof localStorage !== 'undefined') {
      const cart = localStorage.getItem('myCart');
      if (cart) {
        this.myList = JSON.parse(cart);
        this.myCart.next(this.myList);
      }
    }
  }

  InsertCarrito(carr: Carrito) {
    this.myList.push(carr);
    this.myCart.next(this.myList);
    this.saveCart(); // Save to localStorage
    this.updateCartItemCount();
  }

  removeFromCart(idProducto: number) {
    this.myList = this.myList.filter(item => item.product.idProduct !== idProducto);
    this.myCart.next(this.myList);
    this.saveCart(); // Save to localStorage
    this.updateCartItemCount();
  }
  removeAllCart() {
    this.myList = [];
    this.myCart.next(this.myList);
    this.saveCart(); 
    this.updateCartItemCount();
  }
  increaseQuantity(idProducto: number) {
    const item = this.myList.find(item => item.product.idProduct === idProducto);
    if (item) {
      item.cantidad += 1;
      this.myCart.next(this.myList);
      this.saveCart(); // Save to localStorage
      this.updateCartItemCount();
    }
  }

  decreaseQuantity(idProducto: number) {
    const item = this.myList.find(item => item.product.idProduct === idProducto);
    if (item && item.cantidad > 1) {
      item.cantidad -= 1;
      this.myCart.next(this.myList);
      this.saveCart(); 
      this.updateCartItemCount();
    }
  }
  private updateCartItemCount() {
    const totalItems = this.myList.length;
    this.cartItemCount.next(totalItems);
  }

  setListProducForSalet(newList: ProductsForSale[]) {
    this.newChangeProducForSale.next(this.sortListProducForSale(newList))
  }
  getListProducForSale() {
    return this.newChangeProducForSale.asObservable();
  }

}
