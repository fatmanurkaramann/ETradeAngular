import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductContract } from '../contracts/products/product.contract';
import { BasketItemModel } from '../models/baskets/basket-item.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  basketList:BasketItemModel[]=JSON.parse(localStorage.getItem("basket")) as BasketItemModel[] ?? []
  private basketTotalAmountSource:BehaviorSubject<number>  = new BehaviorSubject(this.basketList?.reduce((partialSum, a) => partialSum + a.lineTotal, 0) ?? 0)
  constructor(private toastrService:ToastrService) {}
  getBasketList(): BasketItemModel[] {
    return this.basketList;
  }
  addProductBasket(product: ProductContract,quantity:number) {
    var productContains = this.basketList.find(p => p.product.id == product.id);
    if (productContains){
      if(productContains.quantity+quantity > product.stock){
        this.toastrService.error(`${product.name} ürünün stok miktarı ${product.stock} ile sınırlıdır.`,'Sepete eklenemedi!')
        return;
      }
      productContains.quantity += quantity;
      productContains.lineTotal = productContains.quantity * productContains.product.unitPrice
    }
    else {
      if(quantity> product.stock){
        this.toastrService.error(`${product.name} ürünün stok miktarı ${product.stock} ile sınırlıdır.`,'Sepete eklenemedi!')
        return;
      }
      const basketItem:BasketItemModel = {
        product:product,
        quantity : quantity,
        lineTotal : product.unitPrice * quantity
      }
      this.basketList.push(basketItem);
    }
    this.basketTotalAmountSource.next(this.calculateTotalAmount())
    localStorage.setItem("basket",JSON.stringify(this.basketList))
  }
  clearBasket() {
    this.basketList.splice(0, this.basketList.length);
    localStorage.removeItem("basket")
    this.setBasketTotalAmount(this.calculateTotalAmount())
  }
  removeProductBasket(product: ProductContract) {
    const productContains = this.basketList.find(p => p.product.id == product.id);
    if (productContains) {
      var productIndexNo = -1;
      productIndexNo = this.basketList.indexOf(productContains);
      if (productIndexNo != -1)
        this.basketList.splice(productIndexNo, 1);
    }
    localStorage.setItem("basket",JSON.stringify(this.basketList))

    this.basketTotalAmountSource.next(this.basketList.reduce((partialSum, a) => partialSum + a.lineTotal, 0))
  }
  increaseProductQuantity(product:ProductContract){
    const productContains = this.basketList.find(p => p.product.id == product.id);
    if(productContains){
      if(productContains.quantity +1 > product.stock){
        this.toastrService.error(`${product.name} ürünün stok miktarı ${product.stock} ile sınırlıdır.`,'Sepete eklenemedi!')
        return;
      }
      productContains.quantity += 1
      productContains.lineTotal = productContains.quantity * productContains.product.unitPrice
      localStorage.setItem("basket",JSON.stringify(this.basketList))
      this.basketTotalAmountSource.next(this.calculateTotalAmount())
    }
  }
  decreaseProductQuantity(product:ProductContract){
    const productContains = this.basketList.find(p => p.product.id == product.id);
    if(productContains.quantity>1){
      productContains.quantity -= 1
      productContains.lineTotal = productContains.quantity * productContains.product.unitPrice
      localStorage.setItem("basket",JSON.stringify(this.basketList))

    }else if(productContains.quantity == 1){
      this.removeProductBasket(product)
    }
    this.basketTotalAmountSource.next(this.calculateTotalAmount())

  }
  setBasketTotalAmount(amount:number){
    this.basketTotalAmountSource.next(amount);
  }
  getBasketTotalAmount(){
    return this.basketTotalAmountSource.asObservable();
  }
  private calculateTotalAmount(){
    return this.basketList?.reduce((partialSum, a) => partialSum + a.lineTotal, 0)
  }
}
