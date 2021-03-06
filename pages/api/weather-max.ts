// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Decimal } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  MaxMin,
  WeatherMaxMinResponse,
} from "../../src/interface/WeatherMaxReponse";
import { findToday } from "../../src/repository/weather.repository";

export const getMaxMinWeather = async (): Promise<WeatherMaxMinResponse> => {
  const weather = await findToday();
  const humidity = getMaxMin(
    weather.map((w) => {
      return { value: w.humidity, date: w.created! };
    })
  );

  const pressure = getMaxMin(
    weather.map((w) => {
      return { value: w.pressure, date: w.created! };
    })
  );
  const cpuTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.cpuTemp, date: w.created! };
    })
  );
  const indoorTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.indoorTemp, date: w.created! };
    })
  );
  const outdoorTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.outdoorTemp, date: w.created! };
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
  const data = await getMaxMinWeather();

  res.status(200).json(data);
}

const getMaxMin = (sub: { value: Decimal; date: Date }[]): MaxMin => {
  const sorted = sub.sort(
    (sA, sB) => sA.value.toNumber() - sB.value.toNumber()
  );
  return { min: sorted[0], max: sorted[sorted.length - 1] };
};
