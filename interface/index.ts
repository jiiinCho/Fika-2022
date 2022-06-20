export type PostT = {
  id: string;
  user: UserT;
  location: LocationT;
  imgUrl: string;
  createdAt: string;
  review: string;
  likes: number;
  rating: number;
};

export type UserInfoT = UserT & {
  password: string;
  email: string;
  likedPosts: string[];
};

export type UserT = {
  id: string;
  username: string;
  avatar: string;
};

export type LocationT = {
  business: string;
  street: string;
  city: string;
  country: string;
  id: string;
};

// Authentication
export type SignUpUserInputT = {
  email: string;
  imgFile: File;
} & SignInUserInputT;

export type SignInUserInputT = {
  username: string;
  password: string;
  isSignUp: boolean;
};

export type AuthUserT = {
  id: string;
  username: string;
  avatar: string;
  accessToken: string;
  likedPosts: Array<string>;
};

export type AuthResT = {
  user: AuthUserT;
  message: string;
};

export interface AuthServiceI {
  getUser: () => AuthUserT | undefined;
  signUp: (args: SignUpUserInputT) => Promise<AuthResT>;
  signIn: (args: SignInUserInputT) => Promise<AuthResT>;
  logout: () => void;
}
