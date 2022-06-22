import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { UpdateLikes as query } from "@network/queries";
import { PostT } from "@interface/index";

type FetchResponse = {
  data: {
    updateLikes: Response;
  };
};

type Response = {
  post: PostT;
  liked: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }
  const { postId, userId, accessToken } = req.body;
  const requestBody = {
    query,
    variables: { id: postId, userId },
  };

  try {
    const {
      data: {
        updateLikes: { post, liked },
      },
    } = (await fetcher(url, requestBody, accessToken)) as FetchResponse;
    res.json({ post, liked }); //send the response
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
