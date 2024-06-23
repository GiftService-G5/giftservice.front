import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PaymentType } from '../../../models/PaymentType';
import { DeliveryType } from '../../../models/DeliveryType';
import { ReceiptType } from '../../../models/ReceiptType';
import { PaymentTypeService } from '../../../services/payment-type.service';
import { DeliveryTypeService } from '../../../services/delivery-type.service';
import { ReceiptTypeService } from '../../../services/receipt-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ProductsService } from '../../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseService } from '../../../services/purchase.service';
import { Purchase } from '../../../models/Purchase';
import { UserwebService } from '../../../services/userweb.service';
import { UserWeb } from '../../../models/UserWeb';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';
import { PurchaseDetail } from '../../../models/PurchaseDetail';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule

  ],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent implements OnInit {

  listatiposdepago: PaymentType[] = []
  listadeentrega: DeliveryType[] = []
  listarecibo: ReceiptType[] = []
  myCart$ = this.proS.myCart$;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  purchase: Purchase = new Purchase()
  purchaseT: Purchase = new Purchase()
  purchaseTemp: Purchase = new Purchase()

  purchaseDetail: PurchaseDetail = new PurchaseDetail()
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  isLinear = true;

  userloged: UserWeb = new UserWeb()
  idPurchaseRister: number = 0
  existe: Boolean = false
  constructor(private _formBuilder: FormBuilder,
    private ptS: PaymentTypeService,
    private dtS: DeliveryTypeService,
    private rtS: ReceiptTypeService,
    private _snackBar: MatSnackBar,
    private proS: ProductsService,
    private purchaseS: PurchaseService,
    private uS: UserwebService,
    private purchaseDetaS: PurchaseDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      ubicacion: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      tipodeEntrega: ['', Validators.required],
      tipodePago: ['', Validators.required],
      tipodeRecibo: ['', Validators.required]
    });

    this.ptS.list().subscribe((data) => {
      this.listatiposdepago = data;
    });

    this.dtS.list().subscribe((data) => {
      this.listadeentrega = data;
    });

    this.rtS.list().subscribe((data) => {
      this.listarecibo = data;
    });

    if (this.isLinear) {
      this.uS.listId(1).subscribe((data) => {
        this.userloged = data;
      });
    } else {
      this.userloged = new UserWeb();
    }

    this.myCart$.forEach(items => {
      items.forEach(item => {
        this.totalQuantity += item.cantidad;
        this.totalPrice += (item.product.priceProduct + item.personalized.additionalPricePersonalizedDetail) * item.cantidad;
      });
    });

  }
  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }


  async RegistrarCompra() {
    try {
      this.totalQuantity = 0;
      this.totalPrice = 0;
      this.myCart$.forEach(items => {
        items.forEach(item => {
          this.totalQuantity += item.cantidad;
          this.totalPrice += (item.product.priceProduct + item.personalized.additionalPricePersonalizedDetail) * item.cantidad;
        });
      });

      this.purchase.pricePurchase = this.totalPrice
      this.purchase.purchaseStatus = true
      this.purchase.address = this.firstFormGroup.value.ubicacion
      this.purchase.deliveryTypes.idDeliveryType = this.secondFormGroup.value.tipodeEntrega
      this.purchase.paymentTypes.idPayment_Type = this.secondFormGroup.value.tipodePago;
      this.purchase.receiptTypes.idReceipt_Type = this.secondFormGroup.value.tipodeRecibo;
      this.purchase.users.idUser = this.userloged.idUser
      console.log(this.purchase);

      const data = await this.purchaseS.insertR(this.purchase).toPromise();

      if (data) {
        this.purchaseT = data; 
        this.mostrarMensaje("Se registró con éxito la compra 😊");
        await this.guardarDetalleCompra(this.purchaseT); 
      } else {
        this.mostrarMensaje("Error al registrar la compra");
      }
    }
    catch (e) {
      console.log(e);
      console.log("ERROR AL REGISTRAR LA COMPRA");
    }
  }

  guardarDetalleCompra(PurchaseInserted: Purchase) {
    try {
      this.myCart$.forEach(items => {
        items.forEach(item => {
          const detalleCompra = new PurchaseDetail();
          detalleCompra.purchase.idPurchase = PurchaseInserted.idPurchase;
          detalleCompra.product.idProduct = item.product.idProduct;
          detalleCompra.cantidadPurchaseDetail = item.cantidad;
          detalleCompra.amountTotalPurchaseDetail = (item.product.priceProduct + item.personalized.additionalPricePersonalizedDetail) * item.cantidad;
          this.purchaseDetaS.insert(detalleCompra).subscribe();
        });
      });
      this.proS.removeAllCart();
      console.log(this.purchaseDetail); 
      this.totalPrice = 0.0
      this.totalQuantity = 0
      this.mostrarMensaje("Su compra fue realizada con éxito 😊")
      this.router.navigate([`/viewsProducts`]);

    } catch (error) {
      console.log(error); 
    }
  }
}