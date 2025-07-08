import { CustomerEntity } from "../entities/customer-entity.ts";
import { Paginated } from "../../common/responses/paginated.ts";
import { CustomerWithoutId } from "../types";

export interface CustomersService {

  findAll():  Promise<Paginated<CustomerEntity>>;

  create(customer: CustomerEntity): Promise<CustomerEntity>;

  findById(id: string): Promise<CustomerEntity>;

  delete(id: string): Promise<void>;

  update(id: string, customer: CustomerWithoutId): Promise<CustomerEntity>;

}