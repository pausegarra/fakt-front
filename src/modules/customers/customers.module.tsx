import { Route } from "react-router-dom";
import { ListCustomersPage } from "./pages/list.tsx";
import { Protected } from "../auth/components/protected.tsx";
import { CreateCustomer } from "./pages/create.tsx";

export const customersRoutes = [
  <Route path="/customers" element={<Protected permission={"customers#read"}><ListCustomersPage /></Protected>} />,
  <Route path="/customers/create" element={<Protected permission={"customers#create"}><CreateCustomer /></Protected>} />,
];