import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CategoryContract } from 'src/app/contracts/categories/category.contract';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateProductModel } from 'src/app/models/products/create-product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ShareDataService } from 'src/app/services/share-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateProductModel } from 'src/app/models/products/update-product.model';
@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css'],
})
export class CreateProductDialogComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private shareDataService:ShareDataService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  categories: CategoryContract[] = [];
  @Output() onSuccess = new EventEmitter();
  createProductForm: FormGroup;
  async ngOnInit(): Promise<void> {
    this.initCreateProductForm();
    await this.getAllCategories();
  }
  async getAllCategories() {
    const response = await this.categoryService.getAll();
    this.categories = response.data.items;
  }
  initCreateProductForm() {
    this.createProductForm = this.formBuilder.group({
      id:[this.data?.id,this.data? Validators.required : null],
      name: [this.data?.name, Validators.required],
      categoryId: [this.data?.categoryId, Validators.required],
      unitPrice: [this.data?.unitPrice ?? 0, Validators.required],
      stock: [this.data?.stock ?? 0, Validators.required],
      productImageUrl: [this.data?.productImageUrl ?? "",''],
    });
  }

  async createProduct() {
    if (this.createProductForm.valid) {
      const createProductModel: CreateProductModel = Object.assign(
        {},
        this.createProductForm.value
      );
      const result = await this.productService.createProduct(
        createProductModel
      );
      if (result.success) {
        this.onSuccess.emit();
        this.shareDataService.setAnyChangeOnProductList(true)
      }else{
        this.toastrService.error(result.message,"Hata!")
      }
    } else {
      this.toastrService.error("Tüm alanları eksiksiz giriniz.")
      this.createProductForm.markAllAsTouched();
    }
  }
  async updateProduct(){
    if (this.createProductForm.valid) {
      const updateProductModel: UpdateProductModel = Object.assign(
        {},
        this.createProductForm.value
      );
      const result = await this.productService.updateProduct(
        updateProductModel
      );
      if (result.success) {
        this.onSuccess.emit();
        this.shareDataService.setAnyChangeOnProductList(true)
      }else{
        this.toastrService.error(result.message,"Hata!")
      }
    } else {
      this.toastrService.error("Tüm alanları eksiksiz giriniz.")
      this.createProductForm.markAllAsTouched();
    }
  }
}
