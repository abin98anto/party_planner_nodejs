import { ISelectedProducts } from "./ICart";
import { OrderStatus } from "./misc/enums";

export default interface IOrder {
  _id?: string;
  userId: string;
  productIds: ISelectedProducts[];
  providerIds: string[];
  amount: number;
  address: string;
  status: OrderStatus;
}
