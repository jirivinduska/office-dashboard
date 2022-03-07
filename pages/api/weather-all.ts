// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Weather } from '../../src/interface/Weather';
import { findAll } from '../../src/repository/weather.repository';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Weather[]>
) {
    const weather = await findAll();
    res.status(200).json(weather);
}
