import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.css']
})
export class BasketIconComponent implements OnInit {

  constructor(private basketService:BasketService,private toastrService:ToastrService) { }
  totalAmount:number
  ngOnInit(): void {
    this.basketService.getBasketTotalAmount().subscribe(val=>{
      this.totalAmount = val;
    })
  }

}
