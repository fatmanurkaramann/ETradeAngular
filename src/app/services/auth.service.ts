import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { LoginContract } from '../contracts/auths/login.contract';
import { RegisterContract } from '../contracts/auths/register-contract';
import { TokenContract } from '../contracts/auths/token-contract';
import { SingleResponseContract } from '../contracts/responses/single-response.contract';
import { UserContract } from '../contracts/users/user.contract';
import { LoginModel } from '../models/auths/login.model';
import { RegisterModel } from '../models/auths/register.model';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  public get currentUser(){
    return JSON.parse( localStorage.getItem("user"));
  }
  public get isSuperAdmin() : boolean{
    const user = JSON.parse(localStorage.getItem("user"));
    let value = false;
    if(user!=null && user!=undefined){
      value = user?.roles[0]?.operationClaim.name == "SuperAdmin"
    }
    return value;
  }
  constructor(
    private httpClient: CustomHttpClientService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService:ToastrService
  ) {}

  async login(
    loginModel: LoginModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.post<SingleResponseContract<LoginContract>>(
      {
        controllerName: 'auth',
        action: 'login',
      },
      loginModel
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => {
        errorCallBack ? errorCallBack(err) : null;
      });
    return await promiseData;
  }

  async register(
    registerModel: RegisterModel,
    successCallBack?: () => void,
    errorCallBack?: (httpErrorResponse: HttpErrorResponse) => void
  ) {
    const result = this.httpClient.post<
      SingleResponseContract<RegisterContract>
    >(
      {
        controllerName: 'auth',
        action: 'register',
      },
      registerModel
    );
    const promiseData = firstValueFrom(result);
    promiseData
      .then(() => successCallBack())
      .catch((err: HttpErrorResponse) => {
        errorCallBack ? errorCallBack(err) : null;
      });
    return await promiseData;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.toastrService.success("Çıkış yapıldı!")
    this.identityCheck();
  }
  identityCheck() {
    const token: string = localStorage.getItem('token');
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }
    _isAuthenticated = token != null && !expired;
  }
}
export let _isAuthenticated: boolean;
