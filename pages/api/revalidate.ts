// pages/api/revalidate.js

import { NextApiRequest, NextApiResponse } from "next";

interface RevalidateResponse {
  message?: string;
  revalidated?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidateResponse>
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.unstable_revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    //@ts-ignore
    return res.status(500).send({ message: err });
  }
}
