import axios from "axios";
import { FunctionComponent, useCallback, useState } from "react";
import useSWR from "swr";
import { Color } from "../src/entity/color.model";
import { ChromePicker } from "react-color";
import styles from "../styles/Color.module.css";
import debounce from "lodash.debounce";
const fetcher = (url: string) => axios.get<Color>(url).then((res) => res.data);
const defaultColor = "#000000";

export const ColorComponent: FunctionComponent<{}> = () => {
  const { data, error, mutate } = useSWR("/api/color", fetcher, {
    refreshInterval: 1000,
  });

  const [showPicker, setShowPicker] = useState<boolean>(false);

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
        .then((res) => {
          if (data) {
            const newHex = res.data.colorHex;
            mutate({ ...data, colorHex: newHex });
          }
        });
    }, 500),
    []
  );

  const changeColor = (colorHex: string) => {
    if (data) {
      mutate({ ...data, colorHex: colorHex }, false);
      sendColor(colorHex);
    }
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
        onClick={handleClick}
      ></div>
      {showPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <ChromePicker
            color={color}
            onChange={(color) => changeColor(color.hex)}
          />
        </div>
      ) : null}
    </>
  );
};
