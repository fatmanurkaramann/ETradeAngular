import { BaseContract } from "../base.contract";
import { ProductContract } from "../products/product.contract";

export interface CategoryContract extends BaseContract{
  name:string,
  description:string,
  id:string,
  products: ProductContract[],
}
