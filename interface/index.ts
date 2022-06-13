export type PostT = {
  id: string;
  locationId: string;
  address: string;
  imgUrl: string;
  createdAt: string;
  review: string;
  likes: number;
} & UserT;

export type UserT = {
  userId: string;
  username: string;
  avatar: string;
};

export type ReviewT = {
  id: string;
  locationId: string;
  address: string;
  userId: string;
  username: string;
  createdAt: string;
  review: string;
};
