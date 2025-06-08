import { ReactNode } from "react";
import { ErrorFallback } from "./error.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

type props = {
  children: ReactNode;
}

export function ErrorBoundaryWrapper({children}: props) {
  const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
      {children}
    </ErrorBoundary>
  )
}