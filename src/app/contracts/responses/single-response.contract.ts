import { ResponseContract } from "./response.contract";

export interface SingleResponseContract<T> extends ResponseContract{
    data:T
}
