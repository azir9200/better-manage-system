export interface OrderProduct {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface TransactionDetails {
  id?: string;
  transactionStatus?: string;
  bank_status?: string;
  sp_code?: string;
  sp_message?: string;
  method?: string;
  date_time?: string;
}

export interface OrderInterface {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  townOrCity: string;
  totalPrice: number;
  products: OrderProduct[];
  status: "Pending" | "Paid" | "Cancelled";
  transaction?: TransactionDetails;
  createdAt?: Date;
  updatedAt?: Date;
}
