import { Weather } from "@prisma/client";
import { FunctionComponent } from "react";
import { WeatherMaxMinResponse } from "../src/interface/WeatherMaxReponse";
import styles from "../styles/Weather.module.css";

export interface WeatherProps {
  weather: Weather;
  weatherMinMax: WeatherMaxMinResponse;
}

export const WeatherComponent: FunctionComponent<WeatherProps> = (props) => {
  const data = props.weather;
  const minMaxData = props.weatherMinMax;
  return (
    <div className={styles.weather}>
      <div>
        <h3>Vnitřní teplota:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.indoorTemp.toString()}°C</div>
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
          <div className={styles.mainText}>
            {" "}
            {data.outdoorTemp.toString()}°C
          </div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.outdoorTemp.max.value.toString()}°C ↓
            {minMaxData.outdoorTemp.min.value.toString()}°C
          </div>
        </div>
      </div>
      <div>
        <h3>Teplota procesoru:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.cpuTemp.toString()}°C</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.cpuTemp.max.value.toString()}°C ↓
            {minMaxData.cpuTemp.min.value.toString()}°C
          </div>
        </div>
      </div>
      <div>
        <h3>Tlak:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.pressure.toString()}hPa</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.pressure.max.value.toString()}hPa ↓
            {minMaxData.pressure.min.value.toString()}
            hPa
          </div>
        </div>
      </div>
      <div>
        <h3>Vlhkost:</h3>
        <div className={styles.text}>
          <div className={styles.mainText}> {data.humidity.toString()}%</div>
          <div className={styles.minorText}>
            {" "}
            ↑{minMaxData.humidity.max.value.toString()}% ↓
            {minMaxData.humidity.min.value.toString()}%
          </div>
        </div>
      </div>
      <div>
        <h3>Čas měření:</h3>
        <div className={styles.mainText}>
          {new Date(data.created!).toLocaleDateString("cs-CZ")}
          {" " + new Date(data.created!).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
