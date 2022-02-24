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
      <div><h3>Vnitřní teplota:</h3> {data.indoorTemp}°C</div>
      <div><h3>Venkovní teplota:</h3> {data.outdoorTemp}°C</div>
      <div><h3>Teplota procesoru:</h3> {data.cpuTemp}°C</div>
      <div><h3>Tlak:</h3> {data.pressure}hPa</div>
      <div><h3>Vlhkost:</h3> {data.humidity}%</div>
    </>
  );
};
