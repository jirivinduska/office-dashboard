import { color } from "@prisma/client";
import prisma from "../database/db";

export const findLast = async (): Promise<color | null | undefined> => {
  return prisma.color.findFirst({ orderBy: { created: "desc" } });
};

export const addColor = async (colorHex: string): Promise<color> => {
  return prisma.color.create({ data: { color_hex: colorHex } });
};
