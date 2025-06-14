import { CustomerEntity } from "../entities/customer-entity.ts";
import { Paginated } from "../../common/responses/paginated.ts";

export interface CustomersService {

  findAll():  Promise<Paginated<CustomerEntity>>;

  create(customer: CustomerEntity): Promise<CustomerEntity>;

  findById(id: string): Promise<CustomerEntity>;

}