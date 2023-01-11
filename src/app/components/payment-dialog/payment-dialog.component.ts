import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderStatus } from 'src/app/enums/order-status.enum';
import { BasketItemModel } from 'src/app/models/baskets/basket-item.model';
import { CreateOrderDetailModel } from 'src/app/models/orders/create-order-detail.model';
import { CreateOrderModel } from 'src/app/models/orders/create-order.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css'],
})
export class PaymentDialogComponent implements OnInit {
  baskets:BasketItemModel[]
  paymentForm: FormGroup;
  paymentComplete: EventEmitter<any> = new EventEmitter();
  constructor(
    private basketService: BasketService,
    private orderService:OrderService,
    private authService: AuthService,
    private toastrService:ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
    this.applyCardEffect();
    this.baskets = JSON.parse(localStorage.getItem("basket")) as BasketItemModel[] ?? []
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      expireMonth: ['', Validators.required],
      expireYear: ['', Validators.required],
      cvv: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(4)]],
    });
  }

  async createOrder() {
    const createOrderModel : CreateOrderModel = {
      fullAddress: this.authService.currentUser?.fullAddress,
      orderDetails : [],
      orderStatus : OrderStatus.Taken,
      shipmentDate : new Date(),
      totalAmount : this.data.totalAmount,
      userId :  this.authService.currentUser.id
    }
    this.baskets.forEach(basket=>{
      const createOrderDetailModel:CreateOrderDetailModel = {
        lineTotal : basket.lineTotal,
        orderId : "",
        productId : basket.product.id,
        quantity : basket.quantity
      }
      createOrderModel.orderDetails.push(createOrderDetailModel);
    })
    if(this.paymentForm.valid){
      const result = await this.orderService.createOrder(createOrderModel)
      if(result.success){
        this.toastrService.success(result.message,"Başarılı!")
        this.paymentComplete.emit();
      }
      else{
        this.toastrService.error(result.message?? "Bilinmeyen bir hata meydana geldi.")
      }
    }
    else{
      this.toastrService.error("Formu eksizsiz doldurunuz!")
    }
  }
  applyCardEffect() {
    (document.querySelector('.card-number-input') as HTMLElement).oninput =
      () => {
        (document.querySelector('.card-number-box') as HTMLElement).innerText =
          (
            document.querySelector('.card-number-input') as HTMLInputElement
          ).value;
      };

    (document.querySelector('.card-holder-input') as HTMLElement).oninput =
      () => {
        (document.querySelector('.card-holder-name') as HTMLElement).innerText =
          (
            document.querySelector('.card-holder-input') as HTMLInputElement
          ).value;
      };

    (document.querySelector('.month-input') as HTMLElement).oninput = () => {
      (document.querySelector('.exp-month') as HTMLElement).innerText = (
        document.querySelector('.month-input') as HTMLInputElement
      ).value;
    };

    (document.querySelector('.year-input') as HTMLElement).oninput = () => {
      (document.querySelector('.exp-year') as HTMLElement).innerText = (
        document.querySelector('.year-input') as HTMLInputElement
      ).value;
    };

    (document.querySelector('.cvv-input') as HTMLElement).onmouseenter = () => {
      (document.querySelector('.front') as HTMLElement).style.transform =
        'perspective(1000px) rotateY(-180deg)';
      (document.querySelector('.back') as HTMLElement).style.transform =
        'perspective(1000px) rotateY(0deg)';
    };

    (document.querySelector('.cvv-input') as HTMLElement).onmouseleave = () => {
      (document.querySelector('.front') as HTMLElement).style.transform =
        'perspective(1000px) rotateY(0deg)';
      (document.querySelector('.back') as HTMLElement).style.transform =
        'perspective(1000px) rotateY(180deg)';
    };

    (document.querySelector('.cvv-input') as HTMLElement).oninput = () => {
      (document.querySelector('.cvv-box') as HTMLElement).innerText = (
        document.querySelector('.cvv-input') as HTMLInputElement
      ).value;
    };
  }
}
