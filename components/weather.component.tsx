import axios from "axios";
import { FunctionComponent } from "react";
import useSWR from "swr";
import { Weather } from "../src/entity/weather.model";
import styles from "../styles/Weather.module.css";

const fetcher = (url: string) =>
  axios.get<Weather>(url).then((res) => res.data);

export const WeatherComponent: FunctionComponent<{}> = () => {
  const { data, error } = useSWR("/api/weather", fetcher, { refreshInterval: 30000 });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className={styles.weather}>
      <div><h3>Vnitřní teplota:</h3><h4> {data.indoorTemp}°C</h4></div>
      <div><h3>Venkovní teplota:</h3><h4> {data.outdoorTemp}°C</h4></div>
      <div><h3>Teplota procesoru:</h3><h4> {data.cpuTemp}°C</h4></div>
      <div><h3>Tlak:</h3><h4> {data.pressure}hPa</h4></div>
      <div><h3>Vlhkost:</h3><h4> {data.humidity}%</h4></div>
      <div><h3>Čas měření:</h3><h4> {new Date(data.created).toLocaleDateString('cs-CZ')} {new Date(data.created).toLocaleTimeString()}</h4></div>
    </div>
  );
};
