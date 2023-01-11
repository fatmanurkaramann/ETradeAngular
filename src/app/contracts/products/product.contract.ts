import { BaseContract } from "../base.contract"
import { CategoryContract } from "../categories/category.contract"

export interface ProductContract extends BaseContract{
  name:string
  unitPrice:number,
  stock:number,
  productImageUrl:string,
  categoryId:string,
  categoryName:string
  category:CategoryContract
}
