import Keycloak from "keycloak-js";
import { AuthServiceImpl } from "./services/auth.service";
import type { AuthService } from "./contracts/auth-service";
import { fetchService } from "../common/root.ts";

const keycloak = new Keycloak({
  url: "https://auth.pausegarra.es",
  realm: "principal",
  clientId: "fakt",
});

export const authService: AuthService = new AuthServiceImpl(keycloak, fetchService);