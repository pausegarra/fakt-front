import { BrowserRouter, Routes } from "react-router-dom";
import { commonRoutes } from "./modules/common/common.module.tsx";
import "./app.css"
import { authRoutes } from "./modules/auth/auth.module.tsx";
import { AuthProvider } from "./modules/auth/contexts/auth.context.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./modules/common/components/error.tsx";
import '@mantine/notifications/styles.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            {...commonRoutes}
            {...authRoutes}
          </Routes>
          </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
