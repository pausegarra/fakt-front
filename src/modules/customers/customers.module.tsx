import { Route } from "react-router-dom";
import { ListCustomersPage } from "./pages/list.tsx";
import { Protected } from "../common/components/protected.tsx";

export const customersRoutes = [
  <Route path="/customers" element={<Protected permission={"customers#read"}><ListCustomersPage /></Protected>} />,
];