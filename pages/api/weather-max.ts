// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Decimal } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
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
      return { value: w.cpu_temp, date: w.created! };
    })
  );
  const indoorTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.indoor_temp, date: w.created! };
    })
  );
  const outdoorTemp = getMaxMin(
    weather.map((w) => {
      return { value: w.outdoor_temp, date: w.created! };
    })
  );

  res.status(200).json({
    indoorTemp: { ...indoorTemp },
    outdoorTemp: { ...outdoorTemp },
    cpuTemp: { ...cpuTemp },
    humidity: { ...humidity },
    pressure: { ...pressure },
    created: new Date(),
  });
}

const getMaxMin = (sub: { value: Decimal; date: Date }[]): MaxMin => {
  const sorted = sub.sort((sA, sB) => Number(sA.value) - Number(sB.value));
  return { min: sorted[0], max: sorted[sorted.length - 1] };
};
