import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input'
import {MatTooltipModule} from '@angular/material/tooltip'
import {AppRoutingModule} from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { LoginComponent } from './components/login/login.component';
import { CreateProductDialogComponent } from './components/product/create-product-dialog/create-product-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryDialogComponent } from './components/category/create-category-dialog/create-category-dialog.component';
import { BasketComponent } from './components/basket/basket.component';
import { BasketIconComponent } from './components/basket/basket-icon/basket-icon.component';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import { OrderComponent } from './components/order/order.component';
import { ScrollUpComponent } from './components/scroll-up/scroll-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductComponent,
    FilterProductPipe,
    LoginComponent,
    CreateProductDialogComponent,
    ConfirmDialogComponent,
    CategoryComponent,
    CreateCategoryDialogComponent,
    BasketComponent,
    BasketIconComponent,
    PaymentDialogComponent,
    OrderComponent,
    ScrollUpComponent,
    NotFoundComponent,
  ],
  imports: [
    MatExpansionModule,
    ModalModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:3000"]
      }
    }),
  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7140/api",multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
