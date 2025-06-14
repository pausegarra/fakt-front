import { Route } from "react-router-dom";
import { Protected } from "../auth/components/protected.tsx";
import { DashboardPage } from "./dashboard.page.tsx";

export const commonRoutes = [
  <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />,
];