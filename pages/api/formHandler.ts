import type { NextApiRequest, NextApiResponse } from "next";
import { createPost as query } from "@network/queries";

import fetch from "node-fetch";

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
    throw new Error("cannot find CLOUDINARY_URL or preset name");
  }
  const post = JSON.parse(req.body);
  console.log("post variable:", post);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const graphql = JSON.stringify({
    query,
    variables: { post },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = (await response.json()) as FetchResponse;
    res.json({ postId: result.data.createPost.id }); //send the response
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
