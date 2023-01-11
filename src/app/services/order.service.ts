import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderContract } from '../contracts/orders/order.contract';
import { PaginationResponseContract } from '../contracts/responses/pagination-response-contract';
import { SingleResponseContract } from '../contracts/responses/single-response.contract';
import { CreateOrderModel } from '../models/orders/create-order.model';
import { PageRequest } from '../models/page-request.model';
import { CustomHttpClientService, RequestParameter } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:CustomHttpClientService) { }

  async createOrder(
    crateOrderModel:CreateOrderModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ) : Promise<SingleResponseContract<CreateOrderModel>>{
    const result = this.httpClient.post<SingleResponseContract<OrderContract>>(
      {
        controllerName: 'orders',
        action: 'create',
      },
      crateOrderModel
    );
    const promiseData = firstValueFrom (result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
  async getOrdersByUserId(
    pageRequest:PageRequest,
    userId:string,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ) : Promise<SingleResponseContract<PaginationResponseContract<OrderContract>>>{
    const result = this.httpClient.get<SingleResponseContract<PaginationResponseContract<OrderContract>>>(
      {
        controllerName: 'orders',
        action: 'getListByUserId',
        queryString : `Page=${pageRequest.page}&PageSize=${pageRequest.pageSize}&userId=${userId}`
      },
    );
    const promiseData = firstValueFrom (result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
}
