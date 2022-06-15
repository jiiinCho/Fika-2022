import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { createUser, loginUser } from "@network/queries";

type AuthUser = { id: string; accessToken: string };
type AuthResponse = {
  user: AuthUser;
  message: string;
};
type LoginResponse = {
  data: {
    login: AuthResponse;
  };
};

type CreateUserResponse = {
  data: {
    createUser: AuthResponse;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }
  const { user: userReq, isSignUp } = req.body;
  const query = !!isSignUp ? createUser : loginUser;
  const body = {
    query,
    variables: { user: userReq },
  };
  try {
    if (isSignUp) {
      const {
        data: {
          createUser: { user, message },
        },
      } = (await fetcher(url, body)) as CreateUserResponse;
      res.json({ user, message });
    } else {
      const {
        data: {
          login: { user, message },
        },
      } = (await fetcher(url, body)) as LoginResponse;
      res.json({ user, message });
    }
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
