// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import queryClient from "./api/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import CustomErrorBoundary from "./components/ErrorBoundary/CustomErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <Router>
            <CustomErrorBoundary queryReset={reset}>
              <App />
            </CustomErrorBoundary>
          </Router>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  </>,

  // </StrictMode>,
);
