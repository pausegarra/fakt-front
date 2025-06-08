import { CustomersService } from "../contracts/customers.service.ts";
import { CustomerEntity } from "../entities/customer-entity.ts";
import { IFetchService } from "@betino/fetch";
import { Paginated } from "../../common/responses/paginated.ts";
import { AuthService } from "../../auth/contracts/auth-service.ts";

export class CustomersServiceImpl implements CustomersService {

  constructor(
    private readonly http: IFetchService,
    private readonly authService: AuthService
  ) {}

  async findAll(): Promise<Paginated<CustomerEntity>> {
    const token = this.authService.getAccessToken();
    return await this.http.get<Paginated<CustomerEntity>>("/api/customers", {}, {
      "Authorization": `Bearer ${token}`
    });
  }

}