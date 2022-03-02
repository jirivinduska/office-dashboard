export interface WeatherMaxMinResponse {
  outdoorTemp: MaxMin;
  indoorTemp: MaxMin;
  cpuTemp: MaxMin;
  pressure: MaxMin;
  humidity: MaxMin;
  created: Date;
}

export interface MaxMin {
  max: number;
  min: number;
}
