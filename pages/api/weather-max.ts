// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateConnection } from "../../src/database/db";
import { Weather } from "../../src/entity/weather.model";
import {
  MaxMin,
  WeatherMaxMinResponse,
} from "../../src/interface/WeatherMaxReponse";
import { findAll, findToday } from "../../src/repository/weather.repository";

export const getWeatherData = async () => {
  const weather = await findToday();
  const dates = weather.map((w) => w.created);

  const humidity = getMaxMin(
    weather.map((w) => {
      return { value: w.humidity, date: w.created };
    })
  );
  const pressure = getMaxMin(
    weather.map((w) => {
      return { value: w.pressure, date: w.created };
    })
  );
  const cpuTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.cpuTemp, date: w.created };
    })
  );
  const indoorTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.indoorTemp, date: w.created };
    })
  );
  const outdoorTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.outdoorTemp, date: w.created };
    })
  );
  return {
    indoorTemp: { ...indoorTemp },
    outdoorTemp: { ...outdoorTemp },
    cpuTemp: { ...cpuTemp },
    humidity: { ...humidity },
    pressure: { ...pressure },
    created: new Date(),
  };
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherMaxMinResponse>
) {
  const data = await getWeatherData();
  res.status(200).json(data);
}

const getMaxMin = (sub: { value: number; date: Date }[]): MaxMin => {
  const sorted = sub.sort((sA, sB) => sA.value - sB.value);
  return { min: sorted[0], max: sorted[sorted.length - 1] };
};
