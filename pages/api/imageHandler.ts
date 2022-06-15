import type { NextApiRequest, NextApiResponse } from "next";

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

  if (!url || !preset) {
    throw new Error("cannot find CLOUDINARY_URL or preset name");
  }

  res.json({ url, preset }); //send the response
}
