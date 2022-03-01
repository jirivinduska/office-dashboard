import axios from "axios";
import { FunctionComponent } from "react";
import useSWR from "swr";
import { Color } from "../src/entity/color.model";
import { ColorRequest } from "../src/interface/ColorRequest";

const fetcher = (url: string) => axios.get<Color>(url).then((res) => res.data);
const defaultColor = "#000000";

export const ColorComponent: FunctionComponent<{}> = () => {
  const { data, error, mutate } = useSWR("/api/color", fetcher, {
    refreshInterval: 1000,
  });

  const generateColor = () => {
    axios
      .post<Color>("/api/color", {
        color:
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substring(0, 6),
      })
      .then((res) => {
        if (data) {
          const newHex = res.data.colorHex;
          mutate({ ...data, colorHex: newHex });
        }
      });
  };
  let color;
  if (error || !data) {
    color = defaultColor;
  } else {
    color = data.colorHex;
  }
  return (
    <>
      <div
        style={{
          backgroundColor: color,
          height: "200px",
          width: "200px",
        }}
        onClick={generateColor}
      ></div>
    </>
  );
};
