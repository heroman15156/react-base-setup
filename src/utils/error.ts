import { AxiosError } from "../type/error.ts";
import { ApiError } from "./ApiError.ts";

export const isAxiosError = <T = unknown>(
  error: unknown,
): error is AxiosError<T> => {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isNetworkError = (error: unknown): boolean => {
  if (!isAxiosError(error)) return false;
  return !error.response || error.message === "Network Error";
};
