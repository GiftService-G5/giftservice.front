import { ProductImageDetail } from "./ProductImageDetail"
import { PersonalizedDetail } from "./personalizeddetail"
import { Product } from "./product"

export class Carrito { 
    imagenProducto: ProductImageDetail = new ProductImageDetail()
    cantidad: number = 0
    personalized: PersonalizedDetail  = new PersonalizedDetail() 
    product: Product = new Product()
}