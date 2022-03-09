import axios from "axios";
import { FunctionComponent } from "react";
import useSWR from "swr";
import {
  WeatherMaxMinResponseString,
  WeatherString,
} from "../src/interface/WeatherString";
import styles from "../styles/Weather.module.css";

export interface WeatherProps {
  weather: WeatherString;
  weatherMinMax: WeatherMaxMinResponseString;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const WeatherComponent: FunctionComponent<WeatherProps> = (props) => {
  const { data: weatherData, error } = useSWR<WeatherString>(
    "/api/weather",
    fetcher,
    {
      refreshInterval: 30000,
    }
  );
  const { data: minMaxWeather, error: minMaxError } =
    useSWR<WeatherMaxMinResponseString>("/api/weather-max", fetcher, {
      refreshInterval: 600000,
    });

  let data;
  let minMaxData;
  if (error || !weatherData || !minMaxWeather || minMaxError) {
    data = props.weather;
    minMaxData = props.weatherMinMax;
  } else {
    data = weatherData;
    minMaxData = minMaxWeather;
  }

  let dateFormat = new Date(data.created);
  dateFormat.setMinutes(
    dateFormat.getMinutes() + dateFormat.getTimezoneOffset()
  );

  return (
    <div className={styles.weather}>
      <div>
        <h3>Vnitřní teplota:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.indoorTemp}°C</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.indoorTemp.max.value}°C ↓
            {minMaxData.indoorTemp.min.value}°C
          </div>
        </div>
      </div>
      <div>
        <h3>Venkovní teplota:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.outdoorTemp}°C</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.outdoorTemp.max.value}°C ↓
            {minMaxData.outdoorTemp.min.value}°C
          </div>
        </div>
      </div>
      <div>
        <h3>Teplota procesoru:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.cpuTemp}°C</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.cpuTemp.max.value}°C ↓{minMaxData.cpuTemp.min.value}°C
          </div>
        </div>
      </div>
      <div>
        <h3>Tlak:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.pressure}hPa</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.pressure.max.value}hPa ↓{minMaxData.pressure.min.value}
            hPa
          </div>
        </div>
      </div>
      <div>
        <h3>Vlhkost:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.humidity}%</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.humidity.max.value}% ↓{minMaxData.humidity.min.value}%
          </div>
        </div>
      </div>
      <div>
        <h3>Čas měření:</h3>
        <div className={styles.mainText}>
          {dateFormat.toLocaleDateString("cs-CZ")}
          {" " + dateFormat.toLocaleTimeString("cs-CZ")}
        </div>
      </div>
    </div>
  );
};
