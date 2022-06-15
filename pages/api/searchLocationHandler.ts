import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { searchLocation as query } from "@network/queries";
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
  const { business } = req.body;
  const requestBody = {
    query,
    variables: { business },
  };

  try {
    const {
      data: { searchLocation },
    } = (await fetcher(url, requestBody)) as FetchResponse;
    res.json({ locations: searchLocation }); //send the response
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
