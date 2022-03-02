export interface WeatherMaxMinResponse {
  outdoorTemp: MaxMin;
  indoorTemp: MaxMin;
  cpuTemp: MaxMin;
  pressure: MaxMin;
  humidity: MaxMin;
  created: Date;
}

export interface MaxMinNumber {
  max: number;
  min: number;
}

export interface MaxMinDate {
  max: Date;
  min: Date;
}

export type MaxMin = { values: MaxMinNumber; dates: MaxMinDate };
