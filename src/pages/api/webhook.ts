import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = (await buffer(req)).toString();
  const data = JSON.parse(rawBody);
  return res.status(200).json({ data });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
