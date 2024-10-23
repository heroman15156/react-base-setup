import { AxiosRequestConfig } from "axios";

export interface AxiosError<T = unknown> {
  isAxiosError: boolean;
  response?: {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };
  request?: any;
  code?: string;
  message: string;
  config: AxiosRequestConfig;
  toJSON: () => object;
}
