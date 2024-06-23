
import { UserWeb } from "./UserWeb";
import { Product } from "./product";
export class Reviews{
    idReviews: number =0
    dateReviews: Date = new Date(Date.now());
    scoreReviews: number = 0.0
    commentReviews: string = ''
    titleReviews: string = ''
    users: UserWeb = new UserWeb()
    product: Product = new Product()
}