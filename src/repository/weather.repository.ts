import { connect } from "http2";
import { DataTypeNotSupportedError, MoreThan } from "typeorm";
import { getOrCreateConnection } from "../database/db";
import { Weather } from "../entity/weather.model";

export const findLast = async (): Promise<Weather | undefined> => {
  return getOrCreateConnection().then((conn) => {
    const repo = conn.getRepository<Weather>("Weather");
    return repo.findOne({ order: { created: "DESC" } });
  });
};

export const findAll = async (): Promise<Weather[]> => {
  return getOrCreateConnection().then((conn) => {
    const repo = conn.getRepository<Weather>("Weather");
    return repo.find({ order: { created: "DESC" } });
  });
};

export const findToday = async (): Promise<Weather[]> => {
  return getOrCreateConnection().then((conn) => {
    const repo = conn.getRepository<Weather>("Weather");
    const today = new Date();
    today.setHours(1); //ISO string moves hours -1
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    return repo.find({
      where: {
        created: MoreThan(today.toISOString()),
      },
    });
  });
};
