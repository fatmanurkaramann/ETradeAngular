import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CategoryContract } from '../contracts/categories/category.contract';
import { PaginationResponseContract } from '../contracts/responses/pagination-response-contract';
import { ResponseContract } from '../contracts/responses/response.contract';
import { SingleResponseContract } from '../contracts/responses/single-response.contract';
import { CreateCategoryModel } from '../models/categories/create-category.model';
import { UpdateCategoryModel } from '../models/categories/update-category.model';
import { PageRequest } from '../models/page-request.model';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: CustomHttpClientService) {}

  async getAll(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<
    SingleResponseContract<PaginationResponseContract<CategoryContract>>
  > {
    const promiseData: Promise<
      SingleResponseContract<PaginationResponseContract<CategoryContract>>> =
      this.httpClient
      .get<
        SingleResponseContract<PaginationResponseContract<CategoryContract>>
      >({
        controllerName: 'categories',
        action: 'GetList',
      })
      .toPromise();
    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack? errorCallBack(errorResponse.message):null
      );
    return await promiseData;
  }
  async createCategory(
    createCategoryModel:CreateCategoryModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ) : Promise<SingleResponseContract<CategoryContract>>{
    const result = this.httpClient.post<SingleResponseContract<CategoryContract>>(
      {
        controllerName: 'categories',
        action: 'create',
      },
      createCategoryModel
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
  async updateCategory(
    updateCategoryModel:UpdateCategoryModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ){
    const result = this.httpClient.post<SingleResponseContract<CategoryContract>>(
      {
        controllerName: 'categories',
        action: 'create',
      },
      updateCategoryModel
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => { errorCallBack? errorCallBack(err) : null});
    return await promiseData;
  }
  async deleteCategory(
    id:string,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse : HttpErrorResponse) => void
  ){
    const result = this.httpClient.post<ResponseContract>(
      {
        controllerName: 'categories',
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
}
