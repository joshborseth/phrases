import { prisma } from "./../../server/db/client";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = await buffer(req);
  const createWebhookResponse = await prisma.webhook.create({
    data: { response: JSON.parse(rawBody.toString()) },
  });
  return res.status(200).json(createWebhookResponse);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
