import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductContract } from 'src/app/contracts/products/product.contract';
import { BasketItemModel } from 'src/app/models/baskets/basket-item.model';
import { BasketService } from 'src/app/services/basket.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  totalAmount:number
  shipmentCost:number = 5
  isPaid:boolean = false;
  constructor(private basketService:BasketService,private dialog:MatDialog,private toastrService:ToastrService) { }
  baskets:BasketItemModel[]
  ngOnInit(): void {
    this.basketService.getBasketTotalAmount().subscribe(val=>{
      this.totalAmount = val
      this.baskets = JSON.parse(localStorage.getItem("basket")) as BasketItemModel[] ?? []

    })
    this.baskets = JSON.parse(localStorage.getItem("basket")) as BasketItemModel[] ?? []
  }

  openDeleteProductFromBasketConfirmModal(product:ProductContract){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        title:"Dikkat!",
        content:`${product.name} ürünü sepetten kaldırılacaktır. Onaylıyor musunuz?`
      }
    })
    dialogRef.componentInstance.onConfirmed.subscribe(()=>{
      this.basketService.removeProductBasket(product);
      dialogRef.close();
    })
  }

  decreaseProductQuantity(product:ProductContract){
    this.basketService.decreaseProductQuantity(product)
  }
  increaseProductQuantity(product:ProductContract){
    this.basketService.increaseProductQuantity(product)
  }
  calculateTotal(){
    return this.totalAmount + this.shipmentCost
  }
  deliveryTypeChanged(event:any){
    this.shipmentCost = parseInt (event.target.value)
  }
  openPaymentDialog(){
    const dialogRef = this.dialog.open(PaymentDialogComponent,{
      data:{
        totalAmount:this.totalAmount + this.shipmentCost
      }
    })
    dialogRef.componentInstance.paymentComplete.subscribe(()=>{
      this.basketService.clearBasket();
      this.isPaid = true;
      dialogRef.close();
    })
  }

}
