// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Weather } from '../../src/entity/weather.model';
import { findLast } from '../../src/repository/weather.repository';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Weather>
) {
  const lastWeather = await findLast();

  if (lastWeather) {
    res.status(200).json(lastWeather);
  } else {
    res.status(500);
  }
}
