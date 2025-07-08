import { FetchService, FetchServiceImpl } from "@betino/fetch";
import { NotificationsService } from "./services/notifications.service.tsx";

export const fetchService: FetchService = new FetchServiceImpl(import.meta.env.VITE_API_URL);
export const notificationsService = new NotificationsService();
