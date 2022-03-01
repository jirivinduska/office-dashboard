import axios from "axios";
import { useState, useEffect, FunctionComponent } from "react";
import useSWR from "swr";
import { Weather } from "../src/entity/weather.model";

const fetcher = (url: string) =>
  axios.get<Weather>(url).then((res) => res.data);

export const WeatherComponent: FunctionComponent<{}> = () => {
  const { data, error } = useSWR("/api/weather", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <div><h2>Vnitřní teplota:</h2><h3> {data.indoorTemp}°C</h3></div>
      <div><h2>Venkovní teplota:</h2><h3> {data.outdoorTemp}°C</h3></div>
      <div><h2>Teplota procesoru:</h2><h3> {data.cpuTemp}°C</h3></div>
      <div><h2>Tlak:</h2><h3> {data.pressure}hPa</h3></div>
      <div><h2>Vlhkost:</h2><h3> {data.humidity}%</h3></div>
      <div><h2>Čas měření:</h2><h3> {new Date(data.created).toLocaleDateString()} {new Date(data.created).toLocaleTimeString()}</h3></div>
    </>
  );
};
