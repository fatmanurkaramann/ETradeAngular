import { OrderStatus } from "src/app/enums/order-status.enum"
import { CreateOrderDetailModel } from "./create-order-detail.model"

export interface CreateOrderModel{
  userId:	string
  orderDetails:	CreateOrderDetailModel[]
  totalAmount:	number
  orderStatus:	OrderStatus
  fullAddress:	string
  shipmentDate	:Date
}
