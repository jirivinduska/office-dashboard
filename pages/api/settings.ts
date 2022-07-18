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
  if (
    !lastName ||
    date.getDate() !== lastName.updated.getDate() ||
    date.getMonth() !== lastName.updated.getMonth() ||
    date.getFullYear() !== lastName.updated.getFullYear()
  ) {
    const nameday = await axios
      .get<NameProps[]>("https://svatky.adresa.info/json")
      .then((data) => data.data)
      .then((names) =>
        updateByType(
          SettingsType.FIRST_NAME,
          names.map((name) => name.name).join(", ")
        )
      );
    return findByType(SettingsType.FIRST_NAME);
  }
  return lastName;
};

export const findLastColor = async (): Promise<Settings | null> => await findByType(SettingsType.COLOR_DASHBOARD);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Settings | ErrorResponse>
) {
  if (req.method === "POST" && req.body) {
    const settings = req.body as Partial<Settings>;
    if (
      settings.type &&
      settings.value &&
      settings.type in SettingsType &&
      settings.type !== SettingsType.FIRST_NAME
    ) {
      const result = await updateByType(settings.type, settings.value);
      res.status(200).json(result);
    } else {
      res.status(404).json({ code: 404, message: "No settingsType found!" });
    }
  } else {
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
}
