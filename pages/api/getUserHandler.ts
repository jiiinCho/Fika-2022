import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { GetUserByIdQuery as query } from "@network/queries/user";
import { UserT } from "@interface/index";

type APIResponseT = {
  data: {
    getUserById: UserT;
  };
};

type ResponseT = {
  user: UserT;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }
  const { userId } = req.body;
  const body = {
    query,
    variables: { id: userId },
  };
  try {
    const {
      data: { getUserById: user },
    } = (await fetcher(url, body)) as APIResponseT;
    res.json({ user });
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
