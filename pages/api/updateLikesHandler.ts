import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { updateLikes as query } from "@network/queries";

type FetchResponse = {
  data: {
    updateLikes: {
      id: string;
      likes: number;
    };
  };
};

type Response = {
  id: string;
  likes: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }
  const { postId } = req.body;

  const requestBody = {
    query,
    variables: { id: postId },
  };

  try {
    const response = await fetcher(url, requestBody);
    const {
      data: {
        updateLikes: { id, likes },
      },
    } = (await response.json()) as FetchResponse;
    res.json({ id, likes }); //send the response
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
