import { connect } from "http2";
import { getOrCreateConnection } from "../database/db";
import { Color } from "../entity/color.model";

export const findLast = async (): Promise<Color | undefined> => {
  return getOrCreateConnection().then((conn) => {
    const repo = conn.getRepository<Color>("Color");
    return repo.findOne({ order: { created: "DESC" } });
  });
};

export const addColor = async (
  colorHex: string
): Promise<Color> => {
  return getOrCreateConnection().then((conn) => {
    const repo = conn.getRepository<Color>("Color");
    return repo.save({ colorHex: colorHex });
  });
};
