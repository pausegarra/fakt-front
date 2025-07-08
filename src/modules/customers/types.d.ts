import type { CustomerEntity } from "./entities/customer-entity.ts";

export type CustomerWithoutId = Omit<CustomerEntity, "id">;