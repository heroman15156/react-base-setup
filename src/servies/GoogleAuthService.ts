import { GoogleTokenResponse, GoogleUserInfo } from "../type/User.ts";
import axios from "axios";

export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_USER_INFO_URL =
  "https://www.googleapis.com/oauth2/v2/userinfo";
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET_KEY = import.meta.env.VITE_GOOGLE_SECRET_KEY;
export const GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
export default class GoogleAuthService {
  static async getTokens(code: string): Promise<GoogleTokenResponse> {
    const response = await axios.post<GoogleTokenResponse>(GOOGLE_TOKEN_URL, {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_SECRET_KEY,
      redirect_uri: "http://localhost:3000/callback",
      grant_type: "authorization_code",
    });
    return response.data;
  }

  static async refreshToken(
    refresh_token: string,
  ): Promise<GoogleTokenResponse> {
    const response = await axios.post<GoogleTokenResponse>(GOOGLE_TOKEN_URL, {
      refresh_token,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_SECRET_KEY,
      grant_type: "refresh_token",
    });

    return response.data;
  }

  static async getUserInfo(access_token: string): Promise<GoogleUserInfo> {
    const response = await axios.get<GoogleUserInfo>(GOOGLE_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }
}
