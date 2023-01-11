import { CreateProductModel } from "./create-product.model"

export interface UpdateProductModel extends CreateProductModel{
  id:string
}
