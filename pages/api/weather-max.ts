// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateConnection } from "../../src/database/db";
import { Weather } from "../../src/entity/weather.model";
import {
  MaxMin,
  WeatherMaxMinResponse,
} from "../../src/interface/WeatherMaxReponse";
import { findAll, findToday } from "../../src/repository/weather.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherMaxMinResponse>
) {
  const weather = await findToday();

  const humidity = getMaxMin(weather.map((w) => w.humidity));
  const pressure = getMaxMin(weather.map((w) => w.pressure));
  const cpuTemp = getMaxMin(weather.map((w) => w.cpuTemp));
  const indoorTemp = getMaxMin(weather.map((w) => w.indoorTemp));
  const outdoorTemp = getMaxMin(weather.map((w) => w.outdoorTemp));

  res.status(200).json({
    indoorTemp: { ...indoorTemp },
    outdoorTemp: { ...outdoorTemp },
    cpuTemp: { ...cpuTemp },
    humidity: { ...humidity },
    pressure: { ...pressure },
    created: new Date(),
  });
}

const getMaxMin = (arr: number[]): MaxMin => {
  return { max: Math.max(...arr), min: Math.min(...arr) };
};
