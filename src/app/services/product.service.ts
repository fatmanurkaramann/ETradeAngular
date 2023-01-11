import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductContract } from '../contracts/products/product.contract';
import { PaginationResponseContract } from '../contracts/responses/pagination-response-contract';
import { ResponseContract } from '../contracts/responses/response.contract';
import { SingleResponseContract } from '../contracts/responses/single-response.contract';
import { PageRequest } from '../models/page-request.model';
import { CreateProductModel } from '../models/products/create-product.model';
import { UpdateProductModel } from '../models/products/update-product.model';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:CustomHttpClientService) { }

  async createProduct(
    createProductModel:CreateProductModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ) : Promise<SingleResponseContract<ProductContract>>{
    const result = this.httpClient.post<SingleResponseContract<ProductContract>>(
      {
        controllerName: 'products',
        action: 'create',
      },
      createProductModel
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
  async updateProduct(
    updateProductModel:UpdateProductModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ){
    const result = this.httpClient.post<SingleResponseContract<ProductContract>>(
      {
        controllerName: 'products',
        action: 'update',
      },
      updateProductModel
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
  async deleteProduct(
    id:string,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ){
    const result = this.httpClient.post<ResponseContract>(
      {
        controllerName: 'products',
        action: 'deletebyid',
        pathVariable:id
      }
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
  async getProductsWithPagination(pageRequest:Partial<PageRequest>,successCallBack?:()=>void,errorCallBack?:(errorMessage:string) => void) : Promise<SingleResponseContract<PaginationResponseContract<ProductContract>>> {
    const promiseData:Promise<SingleResponseContract<PaginationResponseContract<ProductContract>>>= this.httpClient.get<SingleResponseContract<PaginationResponseContract<ProductContract>>>({
      controllerName:"products",
      action : "GetList",
      queryString:`page=${pageRequest.page}&pageSize=${pageRequest.pageSize}`,
    },).toPromise();
    promiseData.then(d=>successCallBack())
      .catch((errorResponse:HttpErrorResponse)=> errorCallBack?errorCallBack(errorResponse.message):null)
    return await promiseData;
  }
}
