import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reviews } from '../models/reviews';
import { environment } from '../../environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { LowScoreOneToThree } from '../models/lowScoreOneToThree';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private url = `${base_url}/reviews`;
  private newChange = new Subject<Reviews[]>();
  // Utilizamos un objeto para mantener listas de comentarios por cada producto
  private reviewsByProduct: { [productId: number]: Subject<Reviews[]> } = {};

  constructor(private httpClient: HttpClient) {}

  private sortList(list: Reviews[]): Reviews[] {
    return list.sort((a, b) => b.idReviews - a.idReviews);
  }

  list() {
    return this.httpClient
      .get<Reviews[]>(this.url)
      .pipe(tap((data) => this.setList(data)));
  }
  insert(r: Reviews) {
    // return this.httpClient.post(this.url, r).pipe(
    //   tap(() => this.list().subscribe()));

    return this.httpClient.post(this.url, r).subscribe(
      () => {
        // Actualizar la lista de comentarios solo para el producto específico
        if (this.reviewsByProduct[r.product.idProduct]) {
          this.fetchReviews(r.product.idProduct);
        }
      },
      (error) => {
        console.error('Error al insertar comentario:', error);
      }
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.httpClient.get<Reviews>(`${this.url}/${id}`);
  }
  update(p: Reviews) {
    return this.httpClient.put(`${this.url}/${p.idReviews}`, p);
  }

  setList(newList: Reviews[]) {
    this.newChange.next(this.sortList(newList));
  }
  getList() {
    return this.newChange.asObservable();
  }

  // listAllByProduct(id:number) {
  //   return this.httpClient.get<Reviews[]>(`${this.url}/byProduct/${id}`).pipe(
  //     tap(data => this.setList(data)));
  // }
  // Obtener la lista de comentarios para un producto específico
  listAllByProduct(productId: number) {
    if (!this.reviewsByProduct[productId]) {
      this.reviewsByProduct[productId] = new Subject<Reviews[]>();
      this.fetchReviews(productId); // Cargar los comentarios la primera vez
    }
    return this.reviewsByProduct[productId].asObservable();
  }

  // Cargar los comentarios para un producto específico
  private fetchReviews(productId: number) {
    this.httpClient
      .get<Reviews[]>(`${this.url}/byProduct/${productId}`)
      .subscribe(
        (data) => {
          this.reviewsByProduct[productId].next(this.sortList(data));
        },
        (error) => {
          console.error('Error al obtener comentarios:', error);
        }
      );
  }

  getProductByLowScore(): Observable<LowScoreOneToThree[]> {
    return this.httpClient.get<LowScoreOneToThree[]>(
      `${this.url}/ProductosConCalificaionBajaUnoATres`
    );
  }
}
