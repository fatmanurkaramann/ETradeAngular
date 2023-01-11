import { ResponseContract } from "./response.contract";

export interface  PaginationResponseContract<T>{
    items:T[],
    index:number,
    size:number,
    count:number,
    pages:number,
    hasPrevious:boolean,
    hasNext:boolean
}
