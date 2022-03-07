// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Weather } from "../../src/entity/weather.model";
import { ErrorResponse } from "../../src/interface/ErrorResponse";
import { findLast } from "../../src/repository/weather.repository";

export const getLastWeather = async () => {
  return await findLast();
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Weather | ErrorResponse>
) {
  const lastWeather = await getLastWeather();

  if (lastWeather) {
    res.status(200).json(lastWeather);
  } else {
    res.status(500).json({ code: 500, message: "no weather found" });
  }
}
