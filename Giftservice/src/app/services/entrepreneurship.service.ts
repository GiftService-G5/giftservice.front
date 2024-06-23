import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Entrepreneurship } from '../models/entrepreneurship';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { PersonalizationEntrepreneurship } from '../models/personalizationEntrepreneurship';
import { ReviewsProduct } from '../models/reviewsProductDTO';
import { PersonalizationEntrepreneurship } from '../models/personalizationEntrepreneurshipDTO';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurshipService {
  private url=`${base_url}/entrepreneurships`
  private listaCambio=new Subject<Entrepreneurship[]>()
  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Entrepreneurship[]>(this.url);
  }
  insert(pd:Entrepreneurship){
    return this.httpClient.post(this.url,pd);
  }
  setList(listaNueva: Entrepreneurship[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Entrepreneurship>(`${this.url}/${id}`);
  }
  update(pd:Entrepreneurship) { 
    return this.httpClient.put(this.url, pd);
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  findTop3PersonalizationsByEntrepreneurshipId(id: number){
    return this.httpClient.get<PersonalizationEntrepreneurship[]>(`${this.url}/top3personalized/${id}`);
  }
  quantityReviewsByProduct(id: number){
    return this.httpClient.get<ReviewsProduct[]>(`${this.url}/quantityReviewsByProduct/${id}`);
  }
}