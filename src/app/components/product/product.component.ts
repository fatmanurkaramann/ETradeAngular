import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductContract } from 'src/app/contracts/products/product.contract';
import { PageRequest } from 'src/app/models/page-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  filterText:string = ""
  products : ProductContract[] = [];
  isAuth = false;
  page = 0
  pageSize = 9999
  constructor(
    private toastrService: ToastrService,
    private productService: ProductService,
    public authService: AuthService,
    private spinnerService:NgxSpinnerService,
    private shareDataService:ShareDataService,
    private basketService:BasketService,
    private dialog:MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.shareDataService.getProductFilterText().subscribe(result=>{
      this.filterText = result
    })
    this.shareDataService.getAnyChangeOnProductList().subscribe(async (result)=>{
      if(result){
        await this.getList();
      }
    })
    await this.getList();
  }
  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuthenticated;
  }

  async getList() {
    this.spinnerService.show()
    const promise = await this.productService.getProductsWithPagination({
      page : this.page,
      pageSize : this.pageSize
    }).finally(()=>{
      this.spinnerService.hide();
    })
    this.products = promise.data.items;
  }
  async openDeleteProductDialog(selectedProduct:ProductContract){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth:"300px",
      data:{
        content:`${selectedProduct.name} adlı ürün silinecektir. Onaylıyor musunuz?`
      }
    })
    dialogRef.componentInstance.onConfirmed.subscribe(async ()=>{
      const result = await this.productService.deleteProduct(selectedProduct.id)
      if(result.success){
        this.toastrService.success(result.message)
        await this.getList();
        dialogRef.close();
      }
      else{
        this.toastrService.error(result.message);
      }
    })
  }
  async openUpdateProductDialog(selectedProduct:ProductContract){
    const dialogRef = this.dialog.open(CreateProductDialogComponent,{
      data:selectedProduct
    })
    dialogRef.componentInstance.onSuccess.subscribe(()=>{
      dialogRef.close();
      this.toastrService.success("Ürün güncellendi.","Başarılı!")
    })
  }
  addBasket(product:ProductContract){
    const quantity = parseFloat ($(`#quantity-${product.id}`).val() as string);
    if(quantity <= 0)
      return;
    this.basketService.addProductBasket(product,quantity)
    const basket = this.basketService.getBasketList()
  }

}
