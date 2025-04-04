import { BaseModel } from "./BaseModel";

export interface UserModel extends BaseModel {
  Username: string;
  Password: string;
  Role: string;
}
