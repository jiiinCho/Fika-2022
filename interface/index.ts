export type PostT = {
  id: string;
  userId: string;
  username: string;
  locationId: string;
  address: string;
  avatar: string;
  imgUrl: string;
  createdAt: string;
  review: string;
  likes: number;
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
