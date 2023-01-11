import { Pipe, PipeTransform } from '@angular/core';
import { ProductContract } from '../contracts/products/product.contract';

@Pipe({
  name: 'filterProductPipe'
})
export class FilterProductPipe implements PipeTransform {

  transform(value: ProductContract[],filterText:string ): any[] {
    return value.filter(p=>p.name.toLowerCase().indexOf(filterText.toLowerCase())!==-1)
   }

}
