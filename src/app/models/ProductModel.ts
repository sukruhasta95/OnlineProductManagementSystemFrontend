import { BaseModel } from "./BaseModel";

export interface ProductModel extends BaseModel {
  name: string;
  description: string;
  price: number;
}
