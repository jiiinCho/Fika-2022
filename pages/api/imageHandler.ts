import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

type Response = {
  url: string;
  preset: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = process.env.CLOUDINARY_URL;
  const preset = process.env.CLOUDINARY_PRESET;

  console.log("url", url);
  console.log("preset", preset);

  if (!url || !preset) {
    throw new Error("cannot find CLOUDINARY_URL or preset name");
  }

  res.json({ url, preset }); //send the response
}
