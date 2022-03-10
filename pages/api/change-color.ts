// pages/api/change-color.js

import { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import spawn from "await-spawn";
import { ErrorResponse } from "../../src/interface/ErrorResponse";
interface ChangeColorResult {
  applied: boolean;
  output: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChangeColorResult | ErrorResponse>
) {
  let data;
  const pass = process.env.PASSWORD;
  try {
    data = await spawn("/home/pi/office-scripts/script");
    //"/home/pi/office-scripts/change-color.py"
    return res.status(200).json({ applied: true, output: data.toString() });
  } catch (err) {
    console.log(err);
    return (
      res
        .status(404)
        //@ts-ignore
        .json({ applied: false, output: "Error see in console!" })
    );
  }
}
