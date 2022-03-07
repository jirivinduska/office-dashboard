// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import os from "os";

interface StatusResponse {
  status: "ALIVE";
  uptime: number;
  uptimeHours: number;
  date: Date;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse>
) {
  const osUptime = os.uptime();
  res.status(200).json({
    status: "ALIVE",
    uptime: osUptime,
    uptimeHours: osUptime / 60 / 60,
    date: new Date(),
  });
}
