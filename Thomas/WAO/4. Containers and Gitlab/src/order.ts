import { Schema } from "mongoose";

export interface Address {
  street_name: string;
  street_number: string;
  city: string;
}

export interface Delivery {
  first_name: string;
  last_name: string;
  address: Address;
}

export interface Order {
  material: string;
  amount: number;
  currency: string;
  price: number;
  timestamp: string;
  delivery: Delivery;
}

export const addressSchema = new Schema<Address>({
  street_name: { type: String, required: true },
  street_number: { type: String, required: true },
  city: { type: String, required: true },
});

export const deliverySchema = new Schema<Delivery>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: addressSchema,
});

export const orderSchema = new Schema<Order>({
  material: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: String, required: true },
  delivery: deliverySchema,
});
