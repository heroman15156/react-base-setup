type User = {
  id: string;
  username: string;
  accessToken: string;
  email: string;
};

type GoogleTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type GoogleUserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export type { User, GoogleTokenResponse, GoogleUserInfo };
