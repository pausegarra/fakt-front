import { CustomersService } from "../contracts/customers.service.ts";
import { CustomerEntity } from "../entities/customer-entity.ts";
import { Paginated } from "../../common/responses/paginated.ts";
import { AuthService } from "../../auth/contracts/auth-service.ts";
import { CustomerWithoutId } from "../types";
import { NifOrEmailAlreadyExists } from "../exceptions/nif-or-email-already-exists.ts";
import { FetchService } from "@betino/fetch";

export class CustomersServiceImpl implements CustomersService {

  constructor(
    private readonly http: FetchService,
    private readonly authService: AuthService
  ) {}

  async findAll(): Promise<Paginated<CustomerEntity>> {
    const token = this.authService.getAccessToken();
    return await this.http.get<Paginated<CustomerEntity>>("/api/customers", {}, {
      "Authorization": `Bearer ${token}`
    });
  }

  async create(customer: CustomerWithoutId): Promise<CustomerEntity> {
    try {
      const token = this.authService.getAccessToken();
      return await this.http.post<CustomerEntity>("/api/customers", customer, {
        "Authorization": `Bearer ${token}`
      });
    } catch (e: any) {
      if (e.status === 400 && e.error.code === "NIF_OR_EMAIL_ALREADY_EXISTS") {
        throw new NifOrEmailAlreadyExists(e.error.message);
      }

      throw e;
    }
  }

  findById(id: string): Promise<CustomerEntity> {
    const token = this.authService.getAccessToken();
    return this.http.get<CustomerEntity>(`/api/customers/${id}`, {}, {
      "Authorization": `Bearer ${token}`
    });
  }

  async delete(id: string): Promise<void> {
    const token = this.authService.getAccessToken();

    await this.http.delete(`/api/customers/${id}`, {
      "Authorization": `Bearer ${token}`
    });
  }

  async update(id: string, customer: CustomerWithoutId): Promise<CustomerEntity> {
    const token = this.authService.getAccessToken();

    return await this.http.put<CustomerEntity>(`/api/customers/${id}`, customer, {
      "Authorization": `Bearer ${token}`
    });
  }

}