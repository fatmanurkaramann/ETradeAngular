import { ResponseContract } from "./response.contract";

export interface ListResponseContract<T> extends ResponseContract{
    data:T[]
}
