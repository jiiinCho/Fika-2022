import type { NextApiRequest, NextApiResponse } from "next";
import { searchLocation as query } from "@network/queries";
import fetch from "node-fetch";
import { LocationT } from "@interface/index";

type FetchResponse = {
  data: {
    searchLocation: Array<LocationT>;
  };
};

type Response = {
  locations: Array<LocationT>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("cannot find BACKEND_URL");
  }

  const { business } = JSON.parse(req.body);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const graphql = JSON.stringify({
    query,
    variables: { business },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = (await response.json()) as FetchResponse;
    res.json({ locations: result.data.searchLocation }); //send the response
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
