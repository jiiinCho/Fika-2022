import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "@network/fetcher";
import { GetLocationByName, GetLocationByCity } from "@network/queries";
import { LocationT } from "@interface/index";

type FetchNameResponse = {
  data: {
    getLocationByName: Array<LocationT>;
  };
};

type FetchCityResponse = {
  data: {
    getLocationByCity: Array<LocationT>;
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
  const { business, city } = req.body;

  const requestBody = business
    ? {
        query: GetLocationByName,
        variables: { business },
      }
    : {
        query: GetLocationByCity,
        variables: { city },
      };

  try {
    if (business) {
      const {
        data: { getLocationByName },
      } = (await fetcher(url, requestBody)) as FetchNameResponse;
      res.json({ locations: getLocationByName }); //send the response
    } else {
      const {
        data: { getLocationByCity },
      } = (await fetcher(url, requestBody)) as FetchCityResponse;
      res.json({ locations: getLocationByCity }); //send the response
    }
  } catch (err) {
    console.error("---------error---------");
    console.error(err);
  }
}
