import axios from "axios";
import { FunctionComponent } from "react";
import useSWR from "swr";
import { Weather } from "../src/entity/weather.model";
import { WeatherMaxMinResponse } from "../src/interface/WeatherMaxReponse";
import styles from "../styles/Weather.module.css";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const WeatherComponent: FunctionComponent<{}> = () => {
  const { data, error } = useSWR<Weather>("/api/weather", fetcher, {
    refreshInterval: 30000,
  });
  const { data: minMaxData, error: minMaxError } =
    useSWR<WeatherMaxMinResponse>("/api/weather-max", fetcher, {
      refreshInterval: 600000,
    });

  if (error || minMaxError) return <div>failed to load</div>;
  if (!data || !minMaxData) return <div>loading...</div>;
  return (
    <div className={styles.weather}>
      <div>
        <h3>Vnitřní teplota:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.indoorTemp}°C</div>
          <div className={styles.minorText}> ↑{minMaxData.indoorTemp.values.max}°C ↓{minMaxData.indoorTemp.values.min}°C</div>
        </div>
      </div>
      <div>
        <h3>Venkovní teplota:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.outdoorTemp}°C</div>
          <div className={styles.minorText}> ↑{minMaxData.outdoorTemp.values.max}°C ↓{minMaxData.outdoorTemp.values.min}°C</div>
        </div>
      </div>
      <div>
        <h3>Teplota procesoru:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.cpuTemp}°C</div>
          <div className={styles.minorText}> ↑{minMaxData.cpuTemp.values.max}°C ↓{minMaxData.cpuTemp.values.min}°C</div>
        </div>
      </div>
      <div>
        <h3>Tlak:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.pressure}hPa</div>
          <div className={styles.minorText}> ↑{minMaxData.pressure.values.max}hPa ↓{minMaxData.pressure.values.min}hPa</div>
        </div>
      </div>
      <div>
        <h3>Vlhkost:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.humidity}%</div>
          <div className={styles.minorText}> ↑{minMaxData.humidity.values.max}% ↓{minMaxData.humidity.values.min}%</div>
        </div>
      </div>
      <div>
        <h3>Čas měření:</h3>
        <div className={styles.mainText}>
          {new Date(data.created).toLocaleDateString("cs-CZ")}
          {" " + new Date(data.created).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
