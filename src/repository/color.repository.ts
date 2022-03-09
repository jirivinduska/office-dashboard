import { Color } from '@prisma/client';
import { prisma } from '../database/db'

export const findLast = async (): Promise<Color| null> => {
  return prisma.color.findFirst({ orderBy: { created: "desc" } });
};

export const addColor = async (colorHex: string): Promise<Color> => {
  return prisma.color.create({ data: { colorHex: colorHex } });
};
