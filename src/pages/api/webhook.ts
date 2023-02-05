import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = (await buffer(req)).toString();
  return rawBody;
};
