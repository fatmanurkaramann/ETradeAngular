import { BaseContract } from "../base.contract";

export interface UserContract extends BaseContract{
  firstName:string
  lastName:string
  email:string
  userName:string
  fullAddress:string
  roles:string[]
}
