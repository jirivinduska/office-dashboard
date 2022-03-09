import { Settings, SettingsType } from "@prisma/client";
import { prisma } from "../database/db";

export const findByType = async (
  type: SettingsType
): Promise<Settings | null> => {
  return prisma.settings.findFirst({ where: { type: type } });
};

export const updateByType = async (
  type: SettingsType,
  value: string
): Promise<Settings> => {
  return prisma.settings.upsert({
    where: { type: type },
    update: { value: value },
    create: { type: type, value: value },
  });
};
