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

export const ColorComponent: FunctionComponent<ColorProps> = (props) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleClose = () => {
    setShowPicker(false);
  };

  const handleClick = () => {
    setShowPicker(!showPicker);
  };

  const sendColor = useCallback(
    debounce((colorHex: string) => {
      axios.post<Color>("/api/color", {
        color: colorHex,
      });
    }, 500),
    []
  );

  const changeColor = (colorHex: string) => {
    sendColor(colorHex);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: props.colorHex,
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
            color={props.colorHex}
            onChange={(color) => changeColor(color.hex)}
          />
        </div>
      ) : null}
    </>
  );
};
