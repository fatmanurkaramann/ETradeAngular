import { OrderStatus } from "src/app/enums/order-status.enum";
import { BaseContract } from "../base.contract";
import { OrderDetailContract } from "./order-detail.contract";

export interface OrderContract extends BaseContract{
  id:string
  userId:	string
  orderDetails:	OrderDetailContract[]
  totalAmount:	number
  orderStatus:	OrderStatus
  fullAddress:	string
  shipmentDate	:Date
}
