import { Routes } from '@angular/router';
import { RegisterReciptTypeComponent } from './components/recipt-type/register-recipt-type/register-recipt-type.component';
import { ReciptTypeComponent } from './components/recipt-type/recipt-type.component';

import { PersonalizedproductdetailsComponent } from './components/personalizedproductdetails/personalizedproductdetails.component';
// import { InsertPersonalizedproductdetailsComponent } from './components/personalizedproductdetails/insert-personalizedproductdetails/insert-personalizedproductdetails.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { InsertPurchaseComponent } from './components/purchase/insert-purchase/insert-purchase.component';
import { ViewProdcutsForSaleComponent } from './components/view-prodcuts-for-sale/view-prodcuts-for-sale.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { DetailProductForSaleComponent } from './components/view-prodcuts-for-sale/detail-product-for-sale/detail-product-for-sale.component';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';
import { InsertPurchaseDetailComponent } from './components/purchase-detail/insert-purchase-detail/insert-purchase-detail.component';
import { InsertPersonalizedproductdetailsComponent } from './components/personalizedproductdetails/insert-personalizedproductdetails/insert-personalizedproductdetails.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PaymentGatewayComponent } from './components/carrito/payment-gateway/payment-gateway.component';
import { segGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModuloUbicacionComponent } from './components/modulo-ubicacion/modulo-ubicacion.component';
import { CountryComponent } from './components/country/country.component';
import { CreateCountryComponent } from './components/country/create-country/create-country.component';
import { CityComponent } from './components/city/city.component';
import { InsertCityComponent } from './components/city/insert-city/insert-city.component';
import { NotificationComponent } from './components/notification/notification.component';
import { InsertNotificationComponent } from './components/notification/insert-notification/insert-notification.component';
import { CategoryComponent } from './components/category/category.component';
import { AddEditCategoryComponent } from './components/category/add-edit-category/add-edit-category.component';
import { EntrepreneurshipComponent } from './components/entrepreneurship/entrepreneurship.component';
import { AddEditEntrepreneurshipComponent } from './components/entrepreneurship/add-edit-entrepreneurship/add-edit-entrepreneurship.component';
import { ChatConversationComponent } from './components/entrepreneurship/chat-conversation/chat-conversation.component';
import { ModuloPagosComponent } from './components/modulo-pagos/modulo-pagos.component';
import { PaymentTypeComponent } from './components/payment-type/payment-type.component';
import { InsertpaymentTypeComponent } from './components/payment-type/insertpayment-type/insertpayment-type.component';
import { DeliveryTypeComponent } from './components/delivery-type/delivery-type.component';
import { CreateDeliveryTypeComponent } from './components/delivery-type/create-delivery-type/create-delivery-type.component';
import { PersonalizedDetailComponent } from './components/personalized-detail/personalized-detail.component';
import { InsertPersonalizeddetailComponent } from './components/personalized-detail/insert-personalizeddetail/insert-personalizeddetail.component';
import { ProductsComponent } from './components/products/products.component';
import { ListImageComponent } from './components/products/list-image/list-image.component';
import { ListPersonalizedproductdetailsComponent } from './components/personalizedproductdetails/list-personalizedproductdetails/list-personalizedproductdetails.component';
import { LandingComponent } from './components/landing/landing.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PuntajeBajoATresComponent } from './components/reportes/puntaje-bajo-atres/puntaje-bajo-atres.component';
import { CantidadDeTipoDeEntregaPorCompraComponent } from './components/reportes/cantidad-de-tipo-de-entrega-por-compra/cantidad-de-tipo-de-entrega-por-compra.component';
import { RankingCategoryPurchaseComponent } from './components/reportes/ranking-category-purchase/ranking-category-purchase.component';
import { RankingPaymentTypeUsedComponent } from './components/reportes/ranking-payment-type-used/ranking-payment-type-used.component';
import { FilterBestSellerComponent } from './components/reportes/filter-best-seller/filter-best-seller.component';
import { SumamountPurchasedateComponent } from './components/reportes/sumamount-purchasedate/sumamount-purchasedate.component';
import { TotalamountEntrepreneurshipComponent } from './components/reportes/totalamount-entrepreneurship/totalamount-entrepreneurship.component';
import { PurchasebyEntrepreneurshipComponent } from './components/reportes/purchaseby-entrepreneurship/purchaseby-entrepreneurship.component';
import { QuantityReviewsProductComponent } from './components/entrepreneurship/quantity-reviews-product/quantity-reviews-product.component';
import { Top3personalizedComponent } from './components/entrepreneurship/top3personalized/top3personalized.component';
import { RegisterComponent } from './components/login/register/register.component';
import { RegisterRoleComponent } from './components/login/register-role/register-role.component';


export const routes: Routes = [
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'registerUser',
    component: RegisterComponent,
  },
  {
    path: 'registrarRole',
    component: RegisterRoleComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'moduloUbicacion', component: ModuloUbicacionComponent,
    children: [
      {
        path: 'paises', component: CountryComponent,
        children: [{ path: 'registro', component: CreateCountryComponent }]
      },
      {
        path: 'ciudades', component: CityComponent,
        children: [{ path: 'registro', component: InsertCityComponent }]
      },
    ]
  },
  {
    path: 'notificacion', component: NotificationComponent,
    children: [{ path: 'registro', component: InsertNotificationComponent }]
  },
  {
    path: 'category', component: CategoryComponent,
    children: [{ path: 'nuevo', component: AddEditCategoryComponent }]
  },
  {
    path: 'entrepreneurship', component: EntrepreneurshipComponent, children: [
      { path: 'add', component: AddEditEntrepreneurshipComponent },
      { path: 'edit/:id', component: AddEditEntrepreneurshipComponent },
      { path: 'chat/:id', component: ChatConversationComponent },
      { path: 'quantityReviewsByProduct/:id', component: QuantityReviewsProductComponent },
      { path: 'top3personalized/:id', component: Top3personalizedComponent },
    ]
  },
  {
    path: 'moduloPagos', component: ModuloPagosComponent,
    children: [
      {
        path: 'ReceiptType', component: ReciptTypeComponent,
        children: [{ path: 'Register', component: RegisterReciptTypeComponent }]
      },
      {
        path: 'paymentType', component: PaymentTypeComponent,
        children: [{ path: 'registro', component: InsertpaymentTypeComponent }]
      },
      {
        path: 'deliveryType', component: DeliveryTypeComponent,
        children: [{ path: 'registro', component: CreateDeliveryTypeComponent }]
      }
    ]
  },
  {
    path: 'personalizedDetail',
    component: PersonalizedDetailComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertPersonalizeddetailComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertPersonalizeddetailComponent,
      },
    ],
    // canActivate: [segGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: 'registro', component: CreateDeliveryTypeComponent },
      { path: 'registroImagenes/:idProduct', component: ListImageComponent },

      { path: 'perzonalizedDetailsProduct/:id', component: PersonalizedproductdetailsComponent, },
      { path: 'listperzonalizedDetailsProduct', component: ListPersonalizedproductdetailsComponent },
      { path: 'ediciones/:id', component: InsertPersonalizedproductdetailsComponent },

    ],
    // canActivate: [segGuard]
  },
  {
    path: 'compras', component: PurchaseComponent,
    children: [{ path: 'registro', component: InsertPurchaseComponent }],
    // canActivate: [segGuard]
  },
  {
    path: 'detallecompras', component: PurchaseDetailComponent,
    children: [{ path: 'registro', component: InsertPurchaseDetailComponent }],
    // canActivate: [segGuard]
  },
  {
    path: 'reviews', component: ReviewsComponent,
    // canActivate: [segGuard]
  },
  {
    path: 'viewsProducts', component: ViewProdcutsForSaleComponent,
    children: [
      { path: 'detailProductForSale/:idProduct', component: DetailProductForSaleComponent },
      { path: 'paymentGateway', component: PaymentGatewayComponent }
    ],
    // canActivate: [segGuard]
  },
  {
    path: 'myCart', component: CarritoComponent,
    children: [{ path: 'paymentGateway', component: PaymentGatewayComponent }]
    // canActivate: [segGuard]
  },
  {
    path: 'paymentGateway', component: PaymentGatewayComponent
    // canActivate: [segGuard]
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'reporteBajoPuntajeATres',
        component: PuntajeBajoATresComponent,
      },
      {
        path:'reporteCantidadDeTipoEntregaPorCompras',
        component: CantidadDeTipoDeEntregaPorCompraComponent
      },
      {
        path:'reporteRankingDeCategoria',
        component: RankingCategoryPurchaseComponent
      },
      {
        path:'reporteRankingTipodePago',
        component: RankingPaymentTypeUsedComponent
      },
      {
        path:'filtroBestSeller',
        component: FilterBestSellerComponent
      },
      {
        path:'sumaCantidadPorFechaCompra',
        component: SumamountPurchasedateComponent
      },
      {
        path:'cantidadTotalPorEmprendimiento',
        component: TotalamountEntrepreneurshipComponent
      },
      {
        path:'comprasPorEmprendimiento',
        component: PurchasebyEntrepreneurshipComponent
      },
    ],
    // canActivate: [segGuard], 
  },

];
