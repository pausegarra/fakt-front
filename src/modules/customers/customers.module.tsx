import { Route } from "react-router-dom";
import { ListCustomersPage } from "./pages/list.tsx";
import { Protected } from "../auth/components/protected.tsx";
import { CreateCustomer } from "./pages/create.tsx";
import { ShowCustomer } from "./pages/show.tsx";
import { EditCustomerPage } from "./pages/edit.tsx";

export const customersRoutes = [
  <Route path="/customers" element={<Protected permission={"customers#read"}><ListCustomersPage /></Protected>} />,
  <Route path="/customers/create" element={<Protected permission={"customers#create"}><CreateCustomer /></Protected>} />,
  <Route path="/customers/:id" element={<Protected permission={"customers#read"}><ShowCustomer /></Protected>} />,
  <Route path="/customers/:id/edit" element={<Protected permission={"customers#update"}><EditCustomerPage /></Protected>} />,
];