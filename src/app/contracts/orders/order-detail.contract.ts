import { BaseContract } from "../base.contract";
import { ProductContract } from "../products/product.contract";

export interface OrderDetailContract extends BaseContract{
  orderId:string,
  productId:string,
  product:ProductContract
  quantity:number,
  lineTotal:number
}
