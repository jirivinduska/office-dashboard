// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateConnection } from "../../src/database/db";
import { Weather } from "../../src/entity/weather.model";
import {
  MaxMin,
  MaxMinDate,
  MaxMinNumber,
  WeatherMaxMinResponse,
} from "../../src/interface/WeatherMaxReponse";
import { findAll, findToday } from "../../src/repository/weather.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherMaxMinResponse>
) {
  const weather = await findToday();
  const dates = weather.map((w) => w.created);

  const humidity = getMaxMin(
    weather.map((w) => w.humidity),
    dates
  );
  const pressure = getMaxMin(
    weather.map((w) => w.pressure),
    dates
  );
  const cpuTemp = getMaxMin(
    weather.map((w) => w.cpuTemp),
    dates
  );
  const indoorTemp = getMaxMin(
    weather.map((w) => w.indoorTemp),
    dates
  );
  const outdoorTemp = getMaxMin(
    weather.map((w) => w.outdoorTemp),
    dates
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

const getMaxMinNumber = (arr: number[]): MaxMinNumber => {
  return { max: Math.max(...arr), min: Math.min(...arr) };
};

const getMaxMinDate = (
  numberArr: number[],
  dateArr: Date[],
  min: number,
  max: number
): MaxMinDate => {
  numberArr = numberArr.map((n) => Number(n));
  const minIndex = numberArr.indexOf(min);
  const minDate = dateArr[minIndex];
  const maxIndex = numberArr.indexOf(max);
  const maxDate = dateArr[maxIndex];
  return { max: maxDate, min: minDate };
};
function getMaxMin(numArr: number[], dateArr: Date[]): MaxMin {
  const minMaxNumber = getMaxMinNumber(numArr);
  const minMaxDate = getMaxMinDate(
    numArr,
    dateArr,
    minMaxNumber.min,
    minMaxNumber.max
  );
  return { values: minMaxNumber, dates: minMaxDate };
}
