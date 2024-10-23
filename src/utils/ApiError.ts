import { AxiosRequestConfig } from "axios";
import { AxiosError } from "../type/error.ts";
import { HTTP_STATUS } from "../constants/error.ts";
type CustomAxiosResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  request?: any;
};
export class ApiError<T = unknown> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: CustomAxiosResponse<T>; // 커스텀 Response 타입 사용
  isAxiosError: boolean;
  toJSON: () => any;

  constructor(error: AxiosError<T>, message?: string) {
    super(message ?? error.message);

    const errorStatus = error.response?.status || 0;
    let name = "ApiError";

    switch (errorStatus) {
      case HTTP_STATUS.BAD_REQUEST: // 400
        name = "ApiBadRequestError";
        break;
      case HTTP_STATUS.UNAUTHORIZED: // 401
        name = "ApiUnauthorizedError";
        break;
      case HTTP_STATUS.FORBIDDEN: // 403
        name = "ApiForbiddenError";
        break;
      case HTTP_STATUS.NOT_FOUND: // 404
        name = "ApiNotFoundError";
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR: // 500
        name = "ApiInternalServerError";
        break;
    }

    this.name = name;
    this.config = error.config;
    this.code = error.code;
    this.request = error.request;
    this.response = error.response;
    this.isAxiosError = error.isAxiosError;
    this.toJSON = error.toJSON;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
