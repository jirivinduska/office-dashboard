import { Weather } from "@prisma/client";
import { prisma } from "../database/db";

export const findLast = async (): Promise<Weather | null> => {
  return prisma.weather.findFirst({ orderBy: { created: "desc" } });
};

export const findAll = async (): Promise<Weather[]> => {
  return prisma.weather.findMany({ orderBy: { created: "desc" } });
};

export const findToday = async (): Promise<Weather[]> => {
  const today = new Date();
  today.setHours(0);
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  return prisma.weather.findMany({
    where: { created: { gte: today } },
  });
};
