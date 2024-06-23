import { Injectable } from '@angular/core';
import { Purchase } from '../models/Purchase';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { QuantityByTypeDeliveryDTO } from '../models/quantityByTypeDeliveryDTO';
import { RankingPaymentTypesUsedDTO } from '../models/rankingPaymentTypesUsedDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private url = `${base_url}/purchases`;
  private listaCambio = new Subject<Purchase[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Purchase[]>(this.url);
  }
  insert(p: Purchase) {
    return this.http.post(this.url, p);
  }
  insertR(p:Purchase){
    return this.http.post<Purchase>(`${this.url}/insertR`,p);
  }
  setList(listaNueva: Purchase[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Purchase>(`${this.url}/${id}`);
  }
  getIdMax(idUsers: number) {
    return this.http.get<number>(`${this.url}/maxIdPurchase/${idUsers}`);
  }
  update(pd: Purchase) {
    return this.http.put(this.url, pd);
  }

  getQuantityByTypeDelivery(): Observable<QuantityByTypeDeliveryDTO[]> {
    return this.http.get<QuantityByTypeDeliveryDTO[]>(
      `${this.url}/CantidadDeTipoDeDeliveryDelTotalDeCompras`
    );
  }
  getRankingPaymentTypeUsed():Observable<RankingPaymentTypesUsedDTO[]>{
    return this.http.get<RankingPaymentTypesUsedDTO[]>(
      `${this.url}/Ranking_payment_type_used`);
  }
}
