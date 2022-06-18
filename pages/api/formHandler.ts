import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { CreatePost as query } from "@network/queries";

type FetchResponse = {
  data: {
    createPost: {
      id: string;
    };
  };
};

type Response = {
  postId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }
  const { post, accessToken } = req.body;
  const mutationBody = {
    query,
    variables: { post },
  };

  try {
    const {
      data: {
        createPost: { id },
      },
    } = (await fetcher(url, mutationBody, accessToken)) as FetchResponse;
    res.json({ postId: id });
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
