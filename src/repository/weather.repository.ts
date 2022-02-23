import { connect } from "http2";
import { getOrCreateConnection } from "../database/db";
import { Weather } from "../entity/weather.model";

export const findLast = async (): Promise<Weather | undefined> => {
    return getOrCreateConnection().then((conn) => {
        const repo = conn.getRepository<Weather>("Weather");
        return repo.findOne({ order: { created: 'DESC' } })
    });
}

export const findAll = async (): Promise<Weather[]> => {
    return getOrCreateConnection().then((conn) => {
        const repo = conn.getRepository<Weather>("Weather");
        return repo.find({ order: { created: 'DESC' } })
    });
}

