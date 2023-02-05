import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new multiparty.Form();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });

  console.log(`Form data: `, data);

  return res.status(200).json("hey man");
};

export const config = {
  api: {
    bodyParser: false,
  },
};
