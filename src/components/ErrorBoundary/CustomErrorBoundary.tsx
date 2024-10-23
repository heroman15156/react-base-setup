import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  FallbackProps,
} from "react-error-boundary";
import NetworkErrorUI from "../NetworkErrorUI.tsx";
import ServerErrorUI from "../ServerErrorUI.tsx";
import React from "react";
import BaseErrorUI from "../BaseErrorUI.tsx";
import { AxiosError } from "axios";

export class APIError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.code = code;
  }
}

function ErrorFallback({
  error,
  resetErrorBoundary,
  queryReset,
}: FallbackProps & { queryReset: () => void }) {
  const handleReset = () => {
    queryReset();
    resetErrorBoundary();
  };

  if (error instanceof APIError || error instanceof AxiosError) {
    const status =
      error instanceof APIError ? error.status : error.response?.status || 0;
    if (status === 0) {
      return <NetworkErrorUI onRetry={handleReset} />;
    } else {
      return <ServerErrorUI status={status} onRetry={handleReset} />;
    }
  }

  return <BaseErrorUI error={error} onRetry={handleReset} />;
}
interface CustomErrorBoundaryProps
  extends Omit<ErrorBoundaryPropsWithComponent, "FallbackComponent"> {
  name?: string;
  children: React.ReactNode;
  queryReset: () => void;
}

const CustomErrorBoundary: React.FC<
  CustomErrorBoundaryProps & { queryReset: () => void }
> = ({ children, name, queryReset, ...props }) => {
  const handleReset = () => {
    queryReset();
  };
  const handleError = (error: Error, info: React.ErrorInfo) => {
    // 에러 로깅
    console.log(`Error in Logging ${name}:`, error, info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={(fallbackProps) => (
        <ErrorFallback {...fallbackProps} queryReset={queryReset} />
      )}
      onReset={handleReset}
      onError={handleError}
      {...props}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
