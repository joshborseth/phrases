import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    res.status(200).json(buf);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
