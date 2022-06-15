import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  url: string;
  preset: string;
  avatar: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = process.env.CLOUDINARY_URL;
  const preset = process.env.CLOUDINARY_PRESET;
  const avatar = process.env.CLOUDINARY_AVATAR;

  if (!url || !preset || !avatar) {
    throw new Error(
      "cannot find CLOUDINARY_URL, CLOUDINARY_PRESET or CLOUDINARY_AVATAR"
    );
  }

  res.json({ url, preset, avatar }); //send the response
}
