import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { updateUser, deleteUser } from "@network/queries";
import { AuthResT } from "@interface/index";

type UpdateUserInfoResponse = {
  data: {
    updateUser: AuthResT;
  };
};

type DeleteUserResponse = {
  data: {
    deleteUser: AuthResT;
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
  const { user: userReq, id, accessToken } = req.body;
  const query = userReq ? updateUser : deleteUser;
  const body = {
    query,
    variables: { id, user: userReq },
  };
  try {
    if (userReq) {
      const {
        data: {
          updateUser: { user, message },
        },
      } = (await fetcher(url, body, accessToken)) as UpdateUserInfoResponse;
      res.json({ user, message });
    } else {
      const {
        data: {
          deleteUser: { user, message },
        },
      } = (await fetcher(url, body, accessToken)) as DeleteUserResponse;
      res.json({ user, message });
    }
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
