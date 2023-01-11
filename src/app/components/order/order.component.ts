import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailContract } from 'src/app/contracts/orders/order-detail.contract';
import { OrderContract } from 'src/app/contracts/orders/order.contract';
import { PaginationResponseContract } from 'src/app/contracts/responses/pagination-response-contract';
import { SingleResponseContract } from 'src/app/contracts/responses/single-response.contract';
import { CreateOrderDetailModel } from 'src/app/models/orders/create-order-detail.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderListModel: SingleResponseContract<
    PaginationResponseContract<OrderContract>
  >;
  pageCount:number[]
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private basketService: BasketService,
    private toastrService: ToastrService,
    private spinnerService:NgxSpinnerService,
    private router:Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getOrderListByUserId();
  }

  async getOrderListByUserId() {
    this.spinnerService.show()
    this.orderListModel = await this.orderService.getOrdersByUserId(
      { page: 0, pageSize: 9999999},
      this.authService.currentUser.id,
      ()=>{},(httpErrorResponse)=>{
        this.toastrService.error(httpErrorResponse.message)
      }
    ).finally(()=>{
      this.spinnerService.hide();
    });
    this.pageCount = Array(this.orderListModel.data.pages).fill(0).map((x,i)=>i)
  }
  orderAgain(orderDetails: OrderDetailContract[]) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:"Siparişi tekrar etmek istediğinize emin misiniz?",
        content:"Mevcut sepetiniz tekrar etmek istediğiniz siparişinizdeki sepet ile değiştirilecek ve sipariş tamamlama ekranına yönlendirileceksiniz.",
      },
    });
    dialogRef.componentInstance.onConfirmed.subscribe((res) => {
      this.basketService.clearBasket();
      this.createOrder(orderDetails);
      dialogRef.close();
      this.router.navigate([`basket`]);
    });
  }
  createOrder(orderDetails: OrderDetailContract[]) {
    for (let i = 0; i < orderDetails.length; i++) {
      if (orderDetails[i].quantity > orderDetails[i].product.stock) {
        this.toastrService.success(
          `${orderDetails[i].product.name} ürününden stoklarımızda ${orderDetails[i].quantity} adet bulunmadığından,  ${orderDetails[i].product.stock} adet olarak sepetinize eklendi.`
        );
        orderDetails[i].quantity = orderDetails[i].product.stock;
      } else if (orderDetails[i].product.stock == 0) {
        this.toastrService.success(
          `${orderDetails[i].product.name} ürününden stoklarımızda kalmadığından sepetinize eklenmemiştir.`
        );
        continue;
      }
      this.basketService.addProductBasket(
        orderDetails[i].product,
        orderDetails[i].quantity
      );
    }
  }
}
