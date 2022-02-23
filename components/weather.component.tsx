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
      <div>Vnitřní teplota: {data.indoorTemp}°C</div>
      <div>Venkovní templota: {data.outdoorTemp}°C</div>
      <div>Tlak: {data.pressure}hPa</div>
      <div>Vlhkost: {data.humidity}%</div>
    </>
  );
};
