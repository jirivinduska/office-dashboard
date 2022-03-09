// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Settings, SettingsType } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { NameProps } from "../../components/nameday.component";
import { ErrorResponse } from "../../src/interface/ErrorResponse";
import {
  findByType,
  updateByType,
} from "../../src/repository/settings.repository";

export const getFirstName = async (): Promise<Settings | null> => {
  const date = new Date();
  const lastName = await findByType(SettingsType.FIRST_NAME);
  if (!lastName || date.getDate() > lastName.created.getDate()) {
    const nameday = await axios
      .get<NameProps[]>("https://svatky.adresa.info/json")
      .then((data) => data.data[0])
      .then((name) => updateByType(SettingsType.FIRST_NAME, name.name));
    return findByType(SettingsType.FIRST_NAME);
  }
  return lastName;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Settings | ErrorResponse>
) {
  let settings;
  if (req.query.type) {
    const type = req.query.type as SettingsType;
    if (type in SettingsType) {
      settings = await findByType(type);
    } else {
      settings = null;
    }
  } else {
    settings = await getFirstName();
  }
  if (settings) {
    res.status(200).json(settings);
  } else {
    res.status(404).json({ code: 404, message: "No settings found!" });
  }
}
