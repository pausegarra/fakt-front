import { CustomersServiceImpl } from "./services/customers.service-impl.ts";
import { fetchService } from "../common/root.ts";
import { authService } from "../auth/root.ts";

export const customersService = new CustomersServiceImpl(fetchService, authService);