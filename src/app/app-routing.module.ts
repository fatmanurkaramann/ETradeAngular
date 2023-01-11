import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {path:'',component:LayoutComponent,children:[
    {path:'',component:ProductComponent},
    {path: 'login', component: LoginComponent },
    {path:'basket',component:BasketComponent, canActivate: [AuthGuard],},
    {path:'my-orders',canActivate: [AuthGuard],component:OrderComponent},
    {path:'**',component:NotFoundComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
