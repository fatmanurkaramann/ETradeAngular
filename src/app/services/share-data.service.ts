import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  productFilterTextSource : BehaviorSubject<string> = new BehaviorSubject("")
  anyChangeOnProductListSource : BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuthSource : BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor() { }

  setProductFilterText(filterText:string){
    this.productFilterTextSource.next(filterText);
  }

  getProductFilterText(){
    return this.productFilterTextSource.asObservable();
  }
  setAnyChangeOnProductList(isChanged:boolean){
    this.anyChangeOnProductListSource.next(isChanged);
  }
  getAnyChangeOnProductList(){
    return this.anyChangeOnProductListSource.asObservable();
  }
}
