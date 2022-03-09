import axios from "axios";
import { FunctionComponent, useCallback, useState } from "react";
import useSWR from "swr";
import { ChromePicker } from "react-color";
import styles from "../styles/Color.module.css";
import debounce from "lodash.debounce";
import { Color } from "@prisma/client";

export interface ColorProps {
  colorHex: string;
}

const fetcher = (url: string) => axios.get<Color>(url).then((res) => res.data);

export const ColorComponent: FunctionComponent<ColorProps> = (props) => {
  const {
    data: color,
    error,
    mutate,
  } = useSWR("/api/color", fetcher, {
    refreshInterval: 10000,
  });
  const [showPicker, setShowPicker] = useState<boolean>(false);
  let colorHex;
  if (!color || error || !color.colorHex) {
    colorHex = props.colorHex;
  } else {
    colorHex = color.colorHex;
  }

  const handleClose = () => {
    setShowPicker(false);
  };

  const handleClick = () => {
    setShowPicker(!showPicker);
  };

  const sendColor = useCallback(
    debounce((colorHex: string) => {
      axios
        .post<Color>("/api/color", {
          color: colorHex,
        })
        .then((res) => res.data)
        .then((color) => {
          mutate(color);
        });
    }, 500),
    []
  );

  const changeColor = (colorHex: string) => {
    if (color) {
      mutate({ ...color, colorHex: colorHex }, false);
      sendColor(colorHex);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: colorHex,
          height: "200px",
          width: "200px",
          borderRadius: "5px",
        }}
        onClick={handleClick}
      ></div>
      {showPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <ChromePicker
            color={colorHex}
            onChange={(color) => changeColor(color.hex)}
          />
        </div>
      ) : null}
    </>
  );
};
