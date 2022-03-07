import { weather_measurement } from "@prisma/client";
import { connect } from "http2";
import prisma from "../database/db";

export const findLast = async (): Promise<
  weather_measurement | null | undefined
> => {
  return prisma.weather_measurement.findFirst({ orderBy: { created: "desc" } });
};

export const findAll = async (): Promise<weather_measurement[]> => {
  return prisma.weather_measurement.findMany({ orderBy: { created: "desc" } });
};

export const findToday = async (): Promise<weather_measurement[]> => {
  const today = new Date();
  today.setHours(0); 
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  return prisma.weather_measurement.findMany({
    where: { created: {gte: today} },
  });
};
