import { Decimal } from "@prisma/client/runtime";

export interface WeatherMaxMinResponse {
  outdoorTemp: MaxMin;
  indoorTemp: MaxMin;
  cpuTemp: MaxMin;
  pressure: MaxMin;
  humidity: MaxMin;
  created: Date;
}


export type MaxMin = {
  max: { value: Decimal; date: Date };
  min: { value: Decimal; date: Date };
};
