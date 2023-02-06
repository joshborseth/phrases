import { prisma } from "./../../server/db/client";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = await buffer(req);
  prisma.webhook.create({ data: { response: JSON.parse(rawBody.toString()) } });
  return res.status(200).json({ rawBody });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
