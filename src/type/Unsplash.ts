export interface User {
  id: string;
  username: string;
  name: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface Sponsorship {
  tagline: string;
  sponsor: User;
}

export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: User;
  likes: number;
  sponsorship?: Sponsorship | null;
}

export interface UnsplashResponse {
  data: UnsplashImage[];
  total: number;
  total_pages: number;
}
