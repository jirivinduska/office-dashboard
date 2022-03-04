export interface WeatherMaxMinResponse {
  outdoorTemp: MaxMin;
  indoorTemp: MaxMin;
  cpuTemp: MaxMin;
  pressure: MaxMin;
  humidity: MaxMin;
  created: Date;
}


export type MaxMin = {
  max: { value: number; date: Date };
  min: { value: number; date: Date };
};
