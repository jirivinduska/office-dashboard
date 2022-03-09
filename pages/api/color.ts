// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Color } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ColorRequest } from "../../src/interface/ColorRequest";
import { ErrorResponse } from "../../src/interface/ErrorResponse";
import { addColor, findLast } from "../../src/repository/color.repository";

export const findLastColor = async (): Promise<Color | null> => await findLast();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Color | ErrorResponse>
) {
  if (req.method === "POST") {
    if (req.body) {
      try {
        const colorReq: ColorRequest = req.body;
        const addedColor = await addColor(colorReq.color);
        res.status(200).json(addedColor);
      } catch (err) {
        res.status(500).json({ code: 500, message: "cannot save color" });
        console.log(err);
      }
    }
  } else {
    const lastColor = await findLastColor();
    if (lastColor) {
      res.status(200).json(lastColor);
    } else {
      res.status(500).json({ code: 500, message: "no color found" });
    }
  }
}
