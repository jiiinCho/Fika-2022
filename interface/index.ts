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

export type UserT = {
  id: string;
  username: string;
  avatar: string;
};

export type AuthUser = {
  password: string;
  email: string;
} & UserT;

export type LocationT = {
  business: string;
  street: string;
  city: string;
  country: string;
  id: string;
};
