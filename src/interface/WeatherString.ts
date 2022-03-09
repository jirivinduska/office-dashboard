export interface WeatherString {
  indoorTemp: string;
  outdoorTemp: string;
  pressure: string;
  humidity: string;
  cpuTemp: string;
  created: string;
}

export interface WeatherMaxMinResponseString {
  outdoorTemp: MaxMinString;
  indoorTemp: MaxMinString;
  cpuTemp: MaxMinString;
  pressure: MaxMinString;
  humidity: MaxMinString;
  created: string;
}

export type MaxMinString = {
  max: { value: number; date: string };
  min: { value: number; date: string };
};
