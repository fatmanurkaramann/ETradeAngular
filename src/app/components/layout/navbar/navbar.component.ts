import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateProductDialogComponent } from '../../product/create-product-dialog/create-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreateCategoryDialogComponent } from '../../category/create-category-dialog/create-category-dialog.component';
import { BasketService } from 'src/app/services/basket.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  isAuth: boolean = false;
  filterText: string = '';
  panelOpenState = false;
  text: string = 'Hesabım';
  constructor(
    public authService: AuthService,
    private basketService:BasketService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
    this.basketService.clearBasket();
  }
  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuthenticated;
  }
  openCreateProductDialog() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      maxWidth: '600px',
    });
    dialogRef.componentInstance.onSuccess.subscribe(() => {
      dialogRef.close();
      this.toastrService.success('Ürün eklendi.', 'Başarılı!');
    });
  }
  openCreateCategoryDialog() {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      maxWidth: '450px',
    });
    dialogRef.componentInstance.onSuccess.subscribe(() => {
      dialogRef.close();
      this.toastrService.success('Kategori eklendi.', 'Başarılı!');
    });
  }
  closeDropdown() {
    $('#dropdown').prop('checked', false);
  }
}
