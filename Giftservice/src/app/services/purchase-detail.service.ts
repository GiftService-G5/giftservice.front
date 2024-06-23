import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { PurchaseDetail } from '../models/PurchaseDetail';
import { HttpClient } from '@angular/common/http';
import { RankingPaymentTypesUsedDTO } from '../models/rankingPaymentTypesUsedDTO';
import { RankingCategoryPurchaseDTO } from '../models/rankingCategoryPurchaseDTO';
import { FilterBestSellerDTO } from '../models/FilterBestSellerDTO';
import { SumAmountByPurchaseDateDTO } from '../models/SumAmountByPurchaseDateDTO';
import { TotalAmountByEntrepreneurshipDTO } from '../models/TotalAmountByEntrepreneurshipDTO';
import { PurchaseByEntrepreneurshipDTO } from '../models/PurchaseByEntrepreneurshipDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {
  private url=`${base_url}/purchasedetails`
  private listaCambio=new Subject<PurchaseDetail[]>()
  constructor(private http:HttpClient) { }  

  list(){
    return this.http.get<PurchaseDetail[]>(this.url);
  }
  insert(pd:PurchaseDetail){
    return this.http.post(this.url,pd);
  }
  setList(listaNueva: PurchaseDetail[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<PurchaseDetail>(`${this.url}/${id}`);
  }
  update(pd:PurchaseDetail) { 
    return this.http.put(this.url, pd);
  }
  getRankingCategoryPurchase():Observable<RankingCategoryPurchaseDTO[]>{
    return this.http.get<RankingCategoryPurchaseDTO[]>(`${this.url}/Ranking_Category_purchase`)
  }
  getBestProductSales(): Observable<FilterBestSellerDTO[]> {
    return this.http.get<FilterBestSellerDTO[]>(`${this.url}/TotalProductosVendidosDescent`);
  }
  getTotalProductosComprados(fecha: string): Observable<SumAmountByPurchaseDateDTO> {
    return this.http.get<SumAmountByPurchaseDateDTO>(`${this.url}/SumaDeCantidadesPorFechaCompra?fechaCompra=${fecha}`);
  }
  getCantidadTotalProductosEmprendimiento(): Observable<TotalAmountByEntrepreneurshipDTO[]> {
    return this.http.get<TotalAmountByEntrepreneurshipDTO[]>(`${this.url}/montodeventasporEmprendimiento`);
  }
  getCantidadComprasPorEmprendimiento(): Observable<PurchaseByEntrepreneurshipDTO[]> {
    return this.http.get<PurchaseByEntrepreneurshipDTO[]>(`${this.url}/cantidaddecomprasporEmprendimiento`);
  }
}
