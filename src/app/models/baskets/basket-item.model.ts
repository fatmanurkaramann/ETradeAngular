import { ProductContract } from "src/app/contracts/products/product.contract";

export interface BasketItemModel{
    quantity:number,
    product:ProductContract,
    lineTotal:number
}
