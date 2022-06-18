import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { CreateUser, LoginUser } from "@network/queries";
import { AuthResT } from "@interface/index";

type LoginResponse = {
  data: {
    login: AuthResT;
  };
};

type CreateUserResponse = {
  data: {
    createUser: AuthResT;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResT>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }
  const { user: userReq, isSignUp } = req.body;
  const query = !!isSignUp ? CreateUser : LoginUser;
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
