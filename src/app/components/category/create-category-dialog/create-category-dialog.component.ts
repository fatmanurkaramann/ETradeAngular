import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CreateCategoryModel } from 'src/app/models/categories/create-category.model';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.css']
})
export class CreateCategoryDialogComponent implements OnInit {

  createCategoryForm:FormGroup
  @Output() onSuccess = new EventEmitter();
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService,private categoryService:CategoryService) { }
  ngOnInit(): void {
    this.initCreateCategoryForm();
  }
  initCreateCategoryForm(){
    this.createCategoryForm = this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required]
    })
  }
  async createCategory(){
    if(this.createCategoryForm.valid){
      const createCategoryModel : CreateCategoryModel = Object.assign({},this.createCategoryForm.value)
      const result = await this.categoryService.createCategory(createCategoryModel)
      if(result?.success){
        this.onSuccess.emit();
      }
      else{
        this.toastrService.error(result.message)
      }
    }
    else{
      this.toastrService.error("Form alanlarını eksiksiz giriniz!")
    }
  }
}
