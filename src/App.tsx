import { BrowserRouter, Routes } from "react-router-dom";
import { commonRoutes } from "./modules/common/common.module.tsx";
import "./app.css"
import { authRoutes } from "./modules/auth/auth.module.tsx";
import { AuthProvider } from "./modules/auth/contexts/auth.context.tsx";
import '@mantine/notifications/styles.css';
import { customersRoutes } from "./modules/customers/customers.module.tsx";
import { ErrorBoundaryWrapper } from "./modules/common/components/error-boundary-wrapper.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <ErrorBoundaryWrapper>
            <Routes>
              {...commonRoutes}
              {...authRoutes}
              {...customersRoutes}
            </Routes>
          </ErrorBoundaryWrapper>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
